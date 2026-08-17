import urllib.request
import sys

endpoints = [
    '/index.html',
    '/css/main.css',
    '/css/components.css',
    '/js/app.js',
    '/js/state.js',
    '/js/sampleData.js',
    '/js/trelloData.js',
    '/js/views/dashboardView.js',
    '/js/views/pipelineView.js',
    '/js/views/pipelineCardModal.js',
    '/js/views/mondayReviewModal.js',
    '/js/views/roadmapView.js',
    '/js/views/kanbanView.js',
    '/js/views/permitsView.js',
    '/js/views/projectModal.js',
    '/js/utils/reporter.js',
    '/js/utils/exportImport.js',
    '/api/trello/board',
    '/api/contractor-foreman/leads'
]

print("Verifying Operations Command Center HTTP endpoints...", flush=True)
all_passed = True
for ep in endpoints:
    url = f"http://127.0.0.1:8000{ep}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'TestRunner/1.0'})
        with urllib.request.urlopen(req, timeout=3) as response:
            code = response.getcode()
            content = response.read()
            if code == 200 and len(content) > 0:
                print(f" [PASS] {ep} ({len(content)} bytes)", flush=True)
            else:
                print(f" [FAIL] {ep} status {code}", flush=True)
                all_passed = False
    except Exception as e:
        print(f" [ERROR] {ep}: {e}", flush=True)
        all_passed = False

if all_passed:
    print(f"\n>>> ALL {len(endpoints)} ENDPOINTS VERIFIED AND HEALTHY (HTTP 200) <<<", flush=True)
    sys.exit(0)
else:
    print("\n>>> VERIFICATION FAILED <<<", flush=True)
    sys.exit(1)
