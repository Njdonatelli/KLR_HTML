def lookup_project(caller_phone: str):
    """
    Mock function to check if the caller is associated with an active project in Contractor Foreman.
    """
    if caller_phone == "+16197391135":
        return {
            "found": True, 
            "project_name": "Oceanside ADU Build", 
            "status": "In Progress",
            "next_milestone": "Foundation Pour on Friday"
        }
    return {"found": False}

def log_call_summary(project_name: str, notes: str):
    """
    Mock function to log a note on the project dashboard in Contractor Foreman.
    """
    return {"status": "success", "message": f"Logged note to {project_name}: {notes}"}

def transfer_to_foreman(reason: str):
    """
    Signals to the Voice Engine to issue a Twilio <Dial> command to transfer the call to the human foreman.
    """
    return {"action": "transfer", "number": "+15551234567", "reason": reason}

# OpenAI Tool definitions schema
OPENAI_TOOLS = [
    {
        "type": "function",
        "name": "lookup_project",
        "description": "Look up an active project in Contractor Foreman by the caller's phone number.",
        "parameters": {
            "type": "object",
            "properties": {
                "caller_phone": {"type": "string", "description": "The phone number of the caller"}
            },
            "required": ["caller_phone"]
        }
    },
    {
        "type": "function",
        "name": "log_call_summary",
        "description": "Log a summary of the call to the project notes in Contractor Foreman.",
        "parameters": {
            "type": "object",
            "properties": {
                "project_name": {"type": "string"},
                "notes": {"type": "string"}
            },
            "required": ["project_name", "notes"]
        }
    },
    {
        "type": "function",
        "name": "transfer_to_foreman",
        "description": "Transfer the call to the human foreman if the caller requests it or for emergencies.",
        "parameters": {
            "type": "object",
            "properties": {
                "reason": {"type": "string"}
            },
            "required": ["reason"]
        }
    }
]

def execute_tool(name: str, args: dict):
    if name == "lookup_project":
        return lookup_project(args.get("caller_phone"))
    elif name == "log_call_summary":
        return log_call_summary(args.get("project_name"), args.get("notes"))
    elif name == "transfer_to_foreman":
        return transfer_to_foreman(args.get("reason"))
    return {"error": "Unknown tool"}
