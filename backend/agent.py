import json
import os
import re
from typing import TypedDict, Annotated, List
import operator
from pathlib import Path
from langchain_nvidia_ai_endpoints import ChatNVIDIA
from langchain_core.messages import BaseMessage, SystemMessage, AIMessage, HumanMessage
from langgraph.graph import StateGraph, END
from dotenv import load_dotenv

load_dotenv()

# --- 1. PATH CONFIGURATION ---
BACKEND_DIR = Path(__file__).resolve().parent
TARGET_DIR = BACKEND_DIR / "generated" / "src" / "projects"

# --- 2. BULLDOZER REPAIR UTILS (Keep this!) ---
def extract_valid_json(raw_text):
    print("   🔧 JSON broken. Attempting 'Rewind & Repair'...")
    clean_text = raw_text.strip()
    if "```json" in clean_text:
        clean_text = clean_text.split("```json")[1].split("```")[0]
    elif "```" in clean_text:
        clean_text = clean_text.split("```")[1].split("```")[0]
    
    try: return json.loads(clean_text)
    except: pass

    # Rewind Loop
    last_valid_comma = clean_text.rfind("},")
    while last_valid_comma > 10:
        candidate = clean_text[:last_valid_comma+1] + "]}"
        try: return json.loads(candidate)
        except: last_valid_comma = clean_text.rfind("},", 0, last_valid_comma)
    return None

# --- 3. FILE WRITER ---
def save_files_from_json(project_name: str, raw_content: str):
    project_root = TARGET_DIR / project_name
    try:
        project_root.mkdir(parents=True, exist_ok=True)
        print(f"\n📂 Created Folder: {project_root}")
    except Exception as e:
        print(f"❌ Error creating folder: {e}")

    try:
        data = extract_valid_json(raw_content)
        if not data:
            print("   ❌ Repair failed. Saving raw dump.")
            with open(project_root / "raw_code_dump.txt", "w", encoding="utf-8") as f:
                f.write(raw_content)
            return "Error: Could not parse code. Saved to raw_code_dump.txt"

        files = data.get("files", [])
        if not files: return "Error: No files found in JSON."

        results = []
        for file_obj in files:
            path = file_obj.get("path")
            code = file_obj.get("code")
            if not path or not code: continue

            target_file = project_root / path
            target_file.parent.mkdir(parents=True, exist_ok=True)
            with open(target_file, "w", encoding="utf-8") as f:
                f.write(code)
            print(f"   ✅ Wrote: {path}")
            results.append(path)
        return f"Successfully saved {len(results)} files!"
    except Exception as e:
        return f"Critical Error: {str(e)}"

# --- 4. MODELS ---
# We use the same model for QA and Coding
llm_qa = ChatNVIDIA(model="mistralai/devstral-2-123b-instruct-2512", temperature=0.5, max_tokens=1024)
llm_coder = ChatNVIDIA(model="mistralai/devstral-2-123b-instruct-2512", temperature=0.1, max_tokens=8096)

class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]

# --- 5. NODES ---

# --- FIXED QA NODE (Now it talks back!) ---
def qa_node(state: AgentState):
    messages = list(state["messages"])
    
    # System Prompt to tell the AI to behave like a helpful assistant
    system_prompt = SystemMessage(content="""You are a Senior Technical Lead.
    GOAL: Briefly explain what you are about to build based on the user request.
    RULES:
    1. Start your response with "ANSWER: ".
    2. Be concise (max 2 sentences).
    3. Do NOT generate code in this step.
    """)
    
    # Insert system prompt at the beginning
    messages.insert(0, system_prompt)
    
    print("\n🗣️ QA AGENT THINKING...")
    try:
        # Actually call the LLM now!
        response = llm_qa.invoke(messages)
        return {"messages": [AIMessage(content=response.content)]}
    except Exception as e:
        # Fallback if the API times out
        print(f"⚠️ QA Timeout: {e}")
        return {"messages": [AIMessage(content="ANSWER: I am starting the build process for your request.")]}

def coder_node(state: AgentState):
    user_msgs = [msg for msg in state["messages"] if isinstance(msg, HumanMessage)]
    if not user_msgs: user_msgs = state["messages"]

    system_prompt = SystemMessage(content="""You are a React Expert.
    OUTPUT JSON ONLY. NO TEXT.
    Structure: { "files": [ { "path": "App.jsx", "code": "..." } ] }
    """)
    
    coder_messages = [system_prompt] + user_msgs
    print("\n🤖 CODER AGENT GENERATING CODE (Streaming)...")
    
    full_response = ""
    try:
        for chunk in llm_coder.stream(coder_messages):
            if chunk.content:
                print(chunk.content, end="", flush=True)
                full_response += chunk.content
    except Exception as e:
        print(f"❌ STREAM ERROR: {e}")
        
    print("\n✅ STREAM FINISHED.")
    return {"messages": [AIMessage(content=full_response)]}

def parser_node(state: AgentState):
    last_msg = state["messages"][-1]
    if not isinstance(last_msg, AIMessage): return {"messages": [AIMessage(content="Failed.")]}
    
    project_name = "generated-project"
    for msg in state["messages"]:
        # THIS IS THE FIX: Looking for "Project: "
        if isinstance(msg, HumanMessage) and "Project: " in msg.content:
            try: 
                project_name = msg.content.split("Project: ")[1].split("\n")[0].strip()
            except: 
                pass
            break

    result = save_files_from_json(project_name, last_msg.content)
    return {"messages": [AIMessage(content=f"BUILD_COMPLETE: {result}")]}

# --- 6. GRAPH ---
workflow = StateGraph(AgentState)
workflow.add_node("qa", qa_node)
workflow.add_node("coder", coder_node)
workflow.add_node("parser", parser_node)
workflow.set_entry_point("qa")
workflow.add_edge("qa", "coder")
workflow.add_edge("coder", "parser")
workflow.add_edge("parser", END)
app_graph = workflow.compile()