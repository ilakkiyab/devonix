import os
import json
import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from langchain_core.messages import HumanMessage, AIMessage

# Import your graph from the agent file
from agent import app_graph

app = FastAPI(title="Lovable Clone Backend")

# --- CORS CONFIGURATION ---
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProjectRequest(BaseModel):
    task: str
    project_name: str

# --- DIRECTORY CONFIGURATION ---
BASE_GEN_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "generated", "src", "projects")
os.makedirs(BASE_GEN_DIR, exist_ok=True)

def get_project_files(project_name: str):
    """Scans the project directory and maps files for Sandpack consumption."""
    project_path = os.path.join(BASE_GEN_DIR, project_name)
    if not os.path.exists(project_path):
        return None
    
    files_data = {}
    for root, _, files in os.walk(project_path):
        for file in files:
            if file.endswith((".jsx", ".js", ".css", ".json")):
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, project_path).replace("\\", "/")
                
                # Sandpack Fix
                key = "/App.js" if rel_path == "App.jsx" else f"/{rel_path}"
                
                with open(file_path, "r", encoding="utf-8") as f:
                    files_data[key] = f.read()
    return files_data

@app.get("/projects")
async def list_projects():
    projects = [d for d in os.listdir(BASE_GEN_DIR) if os.path.isdir(os.path.join(BASE_GEN_DIR, d))]
    return {"projects": sorted(projects)}

@app.get("/project/{project_name}")
async def get_project(project_name: str):
    files = get_project_files(project_name)
    if not files:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"files": files}

@app.get("/history/{project_name}")
def get_chat_history(project_name: str):
    return {"history": []}

@app.post("/generate-stream")
async def generate_code_stream(req: ProjectRequest):
    """Streams the build process using LangGraph's .stream() method."""
    
    async def event_generator():
        try:
            # Initial status
            yield f"data: {json.dumps({'status': 'started', 'message': '📋 Analyzing request...'})}\n\n"
            
            existing_files = get_project_files(req.project_name)
            
            if existing_files:
                context_str = "\n".join([f"--- FILE: {p} ---\n{c}" for p, c in existing_files.items()])
                user_prompt = f"Project: {req.project_name}\nRequest: {req.task}\n\nExisting Code:\n{context_str}"
            else:
                user_prompt = f"Project: {req.project_name}\nRequest: {req.task}"

            # Start streaming the graph
            initial_state = {"messages": [HumanMessage(content=user_prompt)]}
            
            final_status_sent = False

            # THE FIX: Correctly interpreting the stream nodes
            for update in app_graph.stream(initial_state, config={"recursion_limit": 50}):
                
                # Check messages from all nodes
                for node_name in update:
                    messages = update[node_name].get("messages", [])
                    for m in messages:
                        if isinstance(m, AIMessage):
                            # 1. Catch the QA Agent's response but DO NOT exit
                            if "ANSWER:" in m.content:
                                plan_msg = m.content.replace("ANSWER:", "").strip()
                                yield f"data: {json.dumps({'status': 'generating', 'message': f'💡 Plan: {plan_msg}', 'type': 'status'})}\n\n"
                            
                            # 2. Catch the Parser's final completion message AND EXIT
                            elif "BUILD_COMPLETE:" in m.content:
                                final_msg = m.content.replace("BUILD_COMPLETE:", "").strip()
                                yield f"data: {json.dumps({'status': 'complete', 'message': final_msg})}\n\n"
                                final_status_sent = True
                                return
                
                # Check for standard tool/file write updates (if you use tools)
                if "action" in update:
                    tool_msg = update["action"]["messages"][-1]
                    if "[FILE WRITTEN]" in tool_msg.content:
                        yield f"data: {json.dumps({'status': 'file_written', 'message': tool_msg.content, 'type': 'file'})}\n\n"

            # If we somehow drop out of the loop without finishing
            if not final_status_sent:
                yield f"data: {json.dumps({'status': 'complete', 'message': 'Project generated successfully!'})}\n\n"

        except Exception as e:
            yield f"data: {json.dumps({'status': 'error', 'message': f'Backend Error: {str(e)}'})}\n\n"
    
    return StreamingResponse(event_generator(), media_type="text/event-stream")