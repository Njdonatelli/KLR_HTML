"""
Multi-threaded HTTP Server for KLR Build Operations & Digital Assets Command Center
Run: python server.py
"""
import http.server
import os
import sys
import json
import glob
import re
import sys
import uuid

# MOCK DATA STORE for Contractor Foreman Leads
CF_MOCK_LEADS = []

# Ensure UTF-8 output encoding on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
PERMIT_TRACKER_DIR = os.path.join(
    os.path.expanduser("~"), 
    "Klrbuildllc Dropbox", 
    "Klrbuildllc Team Folder", 
    "02_Areas", 
    "Operations", 
    "Permit_Tracker"
)

def get_latest_digest():
    digests_dir = os.path.join(PERMIT_TRACKER_DIR, "digests")
    if not os.path.exists(digests_dir):
        return None
    files = glob.glob(os.path.join(digests_dir, "*_digest.html"))
    if not files:
        return None
    # Sort by filename descending to get latest
    files.sort(reverse=True)
    return files[0]

from html.parser import HTMLParser

class DigestParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.health_alerts = []
        self.permits = []
        
        self.in_health = False
        self.in_health_li = False
        
        self.in_tbody = False
        self.in_tr = False
        self.current_cols = []
        self.current_col = []
        
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "ul" and attrs.get("class") == "xo":
            self.in_health = True
        elif tag == "li" and self.in_health:
            self.in_health_li = True
            
        elif tag == "tbody":
            self.in_tbody = True
        elif tag == "tr" and self.in_tbody:
            self.in_tr = True
            self.current_cols = []
        elif tag == "td" and self.in_tr:
            self.current_col = []
        elif self.in_tr:
            # We want to capture the class or tag type if needed
            self.current_col.append({"tag": tag, "attrs": attrs, "text": ""})

    def handle_endtag(self, tag):
        if tag == "ul" and self.in_health:
            self.in_health = False
        elif tag == "li" and self.in_health_li:
            self.in_health_li = False
            
        elif tag == "tbody":
            self.in_tbody = False
        elif tag == "tr" and self.in_tr:
            self.in_tr = False
            if len(self.current_cols) >= 6:
                self.process_row(self.current_cols)
        elif tag == "td" and self.in_tr:
            self.current_cols.append(self.current_col)
            self.current_col = []

    def handle_data(self, data):
        data = data.strip()
        if not data:
            return
            
        if self.in_health_li:
            # Append data to the last alert or create one
            if not self.health_alerts or self.health_alerts[-1] == "":
                self.health_alerts.append(data)
            else:
                self.health_alerts[-1] += " " + data
                
        elif self.in_tr and getattr(self, 'current_col', None) is not None:
            if not self.current_col:
                self.current_col.append({"tag": None, "attrs": {}, "text": data})
            else:
                self.current_col[-1]["text"] += data

    def process_row(self, cols):
        def extract(col, cls=None, tag=None):
            for item in col:
                if cls and item.get("attrs", {}).get("class") == cls:
                    return item["text"]
                if tag and item.get("tag") == tag:
                    return item["text"]
            return ""

        def extract_all(col, cls=None, tag=None):
            return [item["text"] for item in col if (cls and item.get("attrs", {}).get("class") == cls) or (tag and item.get("tag") == tag)]

        score_col = cols[0]
        prop_col = cols[1]
        sig_col = cols[2]
        mile_col = cols[3]
        date_col = cols[4]
        perm_col = cols[5]
        
        # Tier is in the first span (xd, xc, xk)
        tier = ""
        for item in score_col:
            if item["tag"] == "span" and item.get("attrs", {}).get("class") in ["xd", "xc", "xk"]:
                tier = item["text"]
                break
                
        score = extract(score_col, tag="b")
        address = extract(prop_col, tag="b")
        city = extract(prop_col, cls="xb")
        owner = extract(prop_col, cls="xj")
        
        signal_desc = ""
        if sig_col and sig_col[0].get("tag") is None:
            signal_desc = sig_col[0]["text"]
            
        tags = extract_all(sig_col, cls="xe")
        
        status = extract(mile_col, cls="xh")
        sub_status = extract(mile_col, cls="xb")
        
        dates_text = " ".join([item["text"] for item in date_col if item["text"]])
        
        permit_id = extract(perm_col, cls="xf")
        scope = extract(perm_col, cls="xg")
        
        self.permits.append({
            "id": permit_id,
            "tier": tier,
            "score": int(score) if score.isdigit() else 0,
            "address": address,
            "city": city,
            "ownerName": owner,
            "signalDesc": signal_desc,
            "tags": tags,
            "status": status,
            "subStatus": sub_status,
            "dates": dates_text,
            "scope": scope
        })

def parse_digest(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        parser = DigestParser()
        parser.feed(content)
        
        return {
            "health": parser.health_alerts,
            "permits": parser.permits,
            "timestamp": os.path.basename(filepath).split('_')[0]
        }
    except Exception as e:
        return {"error": str(e)}

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        if self.path == '/api/permits/latest':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            
            latest_file = get_latest_digest()
            if latest_file:
                data = parse_digest(latest_file)
                self.wfile.write(json.dumps(data).encode('utf-8'))
            else:
                self.wfile.write(json.dumps({"error": "No digest found"}).encode('utf-8'))
            return
            
        elif self.path == '/api/trello/board':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            board_info = {
                "id": "6a761bf9cf4fd4ddf74d298b",
                "name": "KLR Build Operations",
                "url": "https://trello.com/b/FPyKFZQp/klr-build-operations",
                "location": "Oceanside, CA",
                "status": "connected"
            }
            self.wfile.write(json.dumps(board_info).encode('utf-8'))
            return
            
        elif self.path == '/api/contractor-foreman/leads':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"leads": CF_MOCK_LEADS}).encode('utf-8'))
            # Clear the list after fetching so we don't fetch duplicates again
            CF_MOCK_LEADS.clear()
            return

        return super().do_GET()
        
    def do_POST(self):
        if self.path == '/api/webhook/contractor-foreman':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                payload = json.loads(post_data.decode('utf-8'))
                
                # Create a mock lead in our state format
                new_lead = {
                    "id": f"cf-lead-{uuid.uuid4().hex[:8]}",
                    "trelloCardId": "",
                    "title": payload.get('title', 'New Lead from CF'),
                    "lastName": payload.get('lastName', 'Unknown'),
                    "serviceLine": payload.get('serviceLine', 'patio'),
                    "serviceLineLabel": payload.get('serviceLineLabel', 'Patio/Hardscape'),
                    "stage": "stage-0", # Canvassed / Lead intake
                    "stageName": "0 Canvassed",
                    "estimateValue": float(payload.get('estimateValue', 0)),
                    "due": "",
                    "nextAction": "Define Next Action in Monday Review",
                    "phone": payload.get('phone', ''),
                    "email": payload.get('email', ''),
                    "address": payload.get('address', ''),
                    "cfCustomerId": payload.get('cfCustomerId', f"CF-{uuid.uuid4().hex[:6]}"),
                    "consultDate": "",
                    "designStarted": "",
                    "designDelivered": "",
                    "depositClearedDate": "",
                    "hoaSubmittedDate": "",
                    "nextFollowUpDate": "",
                    "labels": [],
                    "checklist": [ { "id": "c1", "name": "Stage exit conditions met", "completed": False } ],
                    "notes": payload.get('notes', 'Imported from Contractor Foreman'),
                    "lastActivity": payload.get('lastActivity', '')
                }
                
                CF_MOCK_LEADS.append(new_lead)
                
                self.send_response(201)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "message": "Lead received"}).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
            return
            
        self.send_response(404)
        self.end_headers()

    # Disable noisy access logs in console if desired, or keep clean
    def log_message(self, format, *args):
        sys.stdout.write(f"[HTTP] {self.address_string()} - {format%args}\n")
        sys.stdout.flush()

if __name__ == "__main__":
    # Use ThreadingHTTPServer for fast concurrent asset serving
    server = http.server.ThreadingHTTPServer(("", PORT), CustomHandler)
    print("================================================================")
    print(f"[OK] KLR Build Operations Command Center is running at:")
    print(f"     http://localhost:{PORT}")
    print("================================================================")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
