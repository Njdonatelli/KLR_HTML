# ==============================================================================
# NOTE: The Twilio integration is NOT built and NOT implemented yet.
# This code is planned for the future and is currently a stub/work-in-progress.
# ==============================================================================
import os
import json
import logging
import asyncio
import websockets
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from twilio.twiml.voice_response import VoiceResponse, Connect, Stream
from dotenv import load_dotenv
import tools

load_dotenv(override=True)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("voicemail-ai")

app = FastAPI(title="KLR Conversational AI")

DOMAIN = os.getenv("DOMAIN", "localhost:5000")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

SYSTEM_PROMPT = """
You are a helpful AI assistant for KLR Build. You are speaking with callers over the phone.
Keep your responses short, conversational, and helpful. Do not output markdown, as your text will be spoken aloud.
Use the lookup_project tool if they mention a phone number or project to find context.
If they leave a message or want to leave a note, use the log_call_summary tool to log it in Contractor Foreman.
"""

VOICE = "shimmer"
# GA model name (Beta models were sunset May 12, 2026)
MODEL = "gpt-realtime-2.1"

@app.get("/")
async def index():
    return {"status": "ok", "message": "Conversational AI API is running."}

@app.post("/voice/incoming")
async def voice_incoming(request: Request):
    """
    Twilio webhook endpoint for incoming calls.
    Returns TwiML to connect the call to our WebSocket /media-stream.
    """
    form_data = await request.form()
    caller_phone = form_data.get('From', 'Unknown')
    logger.info(f"Incoming call from: {caller_phone}")

    response = VoiceResponse()
    # Briefly pause to let the connection settle
    response.pause(length=1)
    
    connect = Connect()
    connect.stream(url=f"wss://{DOMAIN}/media-stream", track="inbound_and_outbound")
    response.append(connect)
    
    return HTMLResponse(content=str(response), media_type="application/xml")

@app.websocket("/media-stream")
async def handle_media_stream(websocket: WebSocket):
    await websocket.accept()
    logger.info("Twilio WebSocket connected")

    # Connect to OpenAI Realtime API (GA endpoint — no Beta header)
    openai_url = f"wss://api.openai.com/v1/realtime?model={MODEL}"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }

    try:
        async with websockets.connect(openai_url, additional_headers=headers) as openai_ws:
            logger.info("Connected to OpenAI Realtime API")
            
            # Initialize the session with GA schema (nested audio config)
            session_update = {
                "type": "session.update",
                "session": {
                    "type": "realtime",
                    "modalities": ["audio", "text"],
                    "instructions": SYSTEM_PROMPT,
                    "audio": {
                        "input": {
                            "format": "g711_ulaw",
                            "transcription": {
                                "model": "gpt-4o-mini-transcribe"
                            }
                        },
                        "output": {
                            "format": "g711_ulaw",
                            "voice": VOICE
                        }
                    },
                    "turn_detection": {
                        "type": "server_vad",
                        "threshold": 0.5,
                        "prefix_padding_ms": 300,
                        "silence_duration_ms": 500
                    },
                    "tools": tools.OPENAI_TOOLS,
                    "tool_choice": "auto"
                }
            }
            await openai_ws.send(json.dumps(session_update))
            logger.info("Sent session.update")

            stream_sid = None

            # Task 1: Receive audio from Twilio and send to OpenAI
            async def receive_from_twilio():
                nonlocal stream_sid
                try:
                    async for message in websocket.iter_text():
                        data = json.loads(message)
                        if data['event'] == 'start':
                            stream_sid = data['start']['streamSid']
                            logger.info(f"Started Twilio Stream: {stream_sid}")
                            
                            # Prompt the AI to say the initial greeting
                            await openai_ws.send(json.dumps({
                                "type": "conversation.item.create",
                                "item": {
                                    "type": "message",
                                    "role": "user",
                                    "content": [
                                        {
                                            "type": "input_text",
                                            "text": "Greet the caller: say 'Hi, this is the KLR Build virtual assistant. How can I help you today?'"
                                        }
                                    ]
                                }
                            }))
                            await openai_ws.send(json.dumps({"type": "response.create"}))
                            
                        elif data['event'] == 'media':
                            # Twilio sends base64 encoded g711_ulaw audio chunks
                            audio_payload = data['media']['payload']
                            # Forward directly to OpenAI
                            await openai_ws.send(json.dumps({
                                "type": "input_audio_buffer.append",
                                "audio": audio_payload
                            }))
                        elif data['event'] == 'stop':
                            logger.info(f"Twilio Stream {stream_sid} stopped")
                            break
                except WebSocketDisconnect:
                    logger.info("Twilio WebSocket disconnected")
                except Exception as e:
                    logger.error(f"Error in receive_from_twilio: {e}")

            # Task 2: Receive responses from OpenAI and handle logic
            async def receive_from_openai():
                try:
                    async for openai_message in openai_ws:
                        response = json.loads(openai_message)
                        event_type = response.get("type")

                        # GA event name: response.output_audio.delta (was response.audio.delta in beta)
                        if event_type in ("response.output_audio.delta", "response.audio.delta"):
                            if stream_sid:
                                audio_payload = response.get("delta")
                                # Send back to Twilio
                                await websocket.send_json({
                                    "event": "media",
                                    "streamSid": stream_sid,
                                    "media": {
                                        "payload": audio_payload
                                    }
                                })
                        elif event_type == "response.function_call_arguments.done":
                            call_id = response.get("call_id")
                            name = response.get("name")
                            arguments = json.loads(response.get("arguments", "{}"))
                            logger.info(f"AI requested tool {name} with args {arguments}")
                            
                            # Execute the tool
                            result = tools.execute_tool(name, arguments)
                            logger.info(f"Tool result: {result}")
                            
                            # Send tool result back to AI
                            await openai_ws.send(json.dumps({
                                "type": "conversation.item.create",
                                "item": {
                                    "type": "function_call_output",
                                    "call_id": call_id,
                                    "output": json.dumps(result)
                                }
                            }))
                            
                            # Trigger response generation based on tool result
                            await openai_ws.send(json.dumps({"type": "response.create"}))

                        elif event_type == "session.created":
                            logger.info(f"Session created: {response.get('session', {}).get('id', 'unknown')}")
                        elif event_type == "session.updated":
                            logger.info("Session updated successfully")
                        elif event_type == "error":
                            logger.error(f"OpenAI Error: {response}")
                        elif event_type == "input_audio_buffer.speech_started":
                            logger.info("Caller started speaking")
                        elif event_type == "input_audio_buffer.speech_stopped":
                            logger.info("Caller stopped speaking")
                        elif event_type == "response.done":
                            logger.info("AI finished responding")
                            
                except websockets.exceptions.ConnectionClosed:
                    logger.info("OpenAI WebSocket closed")
                except Exception as e:
                    logger.error(f"Error in receive_from_openai: {e}")

            # Run both tasks concurrently
            await asyncio.gather(receive_from_twilio(), receive_from_openai())

    except Exception as e:
        logger.error(f"Failed to connect to OpenAI Realtime API: {e}")
        try:
            await websocket.close()
        except:
            pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
