import asyncio
import websockets
import json
import os
from dotenv import load_dotenv

load_dotenv(override=True)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
print(f"Key loaded: {OPENAI_API_KEY[:10]}...")

async def test():
    openai_url = "wss://api.openai.com/v1/realtime?model=gpt-realtime-2.1"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }
    
    try:
        async with websockets.connect(openai_url, additional_headers=headers) as ws:
            print("Connected!")
            res = await asyncio.wait_for(ws.recv(), timeout=5)
            data = json.loads(res)
            print(f"Event: {data.get('type')}")
            if data.get('type') == 'session.created':
                print(f"Session ID: {data.get('session', {}).get('id', 'unknown')}")
                print("SUCCESS!")
            else:
                print(f"Full response: {json.dumps(data, indent=2)}")
    except Exception as e:
        print(f"FAILED: {e}")

asyncio.run(test())
