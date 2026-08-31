# ==============================================================================
# NOTE: The Twilio integration is NOT built and NOT implemented yet.
# This code is planned for the future and is currently a stub/work-in-progress.
# ==============================================================================
import os
import re
import time
import subprocess
from twilio.rest import Client
from dotenv import load_dotenv

# Load current .env just to get keys
load_dotenv()

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_API_KEY_SID = os.getenv("TWILIO_API_KEY_SID")
TWILIO_API_KEY_SECRET = os.getenv("TWILIO_API_KEY_SECRET")
ENV_FILE = ".env"

def update_env_file(new_domain):
    """Updates the DOMAIN variable in the .env file."""
    if not os.path.exists(ENV_FILE):
        return
    
    with open(ENV_FILE, "r") as f:
        lines = f.readlines()
        
    with open(ENV_FILE, "w") as f:
        for line in lines:
            if line.startswith("DOMAIN="):
                f.write(f"DOMAIN={new_domain}\n")
            else:
                f.write(line)
    print(f"[*] Updated .env with DOMAIN={new_domain}")

def update_twilio_webhook(new_domain):
    """Updates the Twilio IncomingPhoneNumber voice URL."""
    try:
        client = Client(TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, TWILIO_ACCOUNT_SID)
        numbers = client.incoming_phone_numbers.list(limit=1)
        if numbers:
            phone_number = numbers[0]
            new_voice_url = f"https://{new_domain}/voice/incoming"
            phone_number.update(voice_url=new_voice_url)
            print(f"[*] Successfully updated Twilio Webhook for {phone_number.phone_number} to {new_voice_url}")
        else:
            print("[!] No phone numbers found in Twilio account.")
    except Exception as e:
        print(f"[!] Error updating Twilio: {e}")

def main():
    print("[*] Starting Cloudflare Tunnel...")
    # Start cloudflared in a subprocess, combining stdout and stderr
    cf_process = subprocess.Popen(
        [".\\cloudflared.exe", "tunnel", "--url", "http://localhost:5000"],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1
    )
    
    new_domain = None
    # Regex to find the URL: https://some-random-words.trycloudflare.com
    url_pattern = re.compile(r"https://([a-zA-Z0-9-]+\.trycloudflare\.com)")
    
    print("[*] Waiting for Cloudflare to assign a URL...")
    # Read output line by line until we find the URL
    for line in cf_process.stdout:
        print(f"[cloudflared] {line.strip()}")
        match = url_pattern.search(line)
        if match:
            new_domain = match.group(1)
            print(f"\n[*] Found Cloudflare domain: {new_domain}")
            break
            
    if not new_domain:
        print("[!] Failed to extract Cloudflare domain from logs. Tunnel may have crashed.")
        cf_process.terminate()
        return

    # Update configurations
    update_env_file(new_domain)
    update_twilio_webhook(new_domain)
    
    print("\n[*] Starting FastAPI server...")
    # We will use subprocess to start the server and wait for it
    server_process = subprocess.Popen(
        [".\\venv\\Scripts\\python.exe", "main.py"]
    )
    
    try:
        # Keep the main thread alive, forwarding cloudflare logs if we want, or just wait
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[*] Shutting down...")
        cf_process.terminate()
        server_process.terminate()

if __name__ == "__main__":
    main()
