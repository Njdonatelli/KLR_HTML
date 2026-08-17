import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_API_KEY_SID = os.getenv("TWILIO_API_KEY_SID")
TWILIO_API_KEY_SECRET = os.getenv("TWILIO_API_KEY_SECRET")

try:
    client = Client(TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, TWILIO_ACCOUNT_SID)
    numbers = client.incoming_phone_numbers.list(limit=1)
    if numbers:
        print(f"Success! Found number: {numbers[0].phone_number}, VoiceUrl: {numbers[0].voice_url}")
    else:
        print("Success! No numbers found in this account.")
except Exception as e:
    print(f"Error: {e}")
