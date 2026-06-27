# 🚀 Devonix (AI-Powered React Builder)

A full-stack, AI-powered React application generator (inspired by v0 and Lovable). Devonix utilizes LangGraph and Mistral AI to take natural language prompts and stream fully functional, multi-file React/Tailwind applications directly into a live web-based code execution environment.

## ✨ Key Features
* **Multi-Agent Architecture:** Uses a LangGraph Directed Acyclic Graph (DAG) to route tasks between a QA Planning Agent and a React Architect/Coder Agent.
* **Real-Time Streaming UI:** Visualizes the AI's "thought process" and file-writing steps in the UI using Server-Sent Events (SSE).
* **Fault-Tolerant Parsing (Bulldozer Algorithm):** Custom Python logic to detect, rewind, and repair broken JSON outputs caused by LLM token limits, ensuring the app never crashes on large generations.
* **Live Code Preview & Editor:** Integrated `@codesandbox/sandpack-react` allows users to view both the rendered UI and the generated React code side-by-side with a toggleable code editor.
* **Auto-Directory Management:** Automatically creates and structures local project folders on your hard drive for every new generation.

---

## 🛠️ Tech Stack
* **Frontend:** React.js (Vite), Tailwind CSS, Lucide Icons, Sandpack
* **Backend:** FastAPI, Python, Uvicorn
* **AI & Orchestration:** LangGraph, LangChain (NVIDIA AI Endpoints)
* **Model:** `mistralai/devstral-2-123b-instruct-2512`

---

## 📂 Project Structure
```text
├── backend/
│   ├── main.py              # FastAPI server and SSE streaming logic
│   ├── agent.py             # LangGraph State Machine & AI Agents
│   ├── requirements.txt     # Python dependencies
│   └── generated/           # Auto-generated project files are saved here
│
├── frontend/
│   ├── src/App.jsx          # Main Chat UI, Streaming Center, and Sandpack Preview
│   ├── package.json         # Node dependencies
│   └── tailwind.config.js   # Tailwind configuration
⚙️ Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18 or higher)

Python (3.10 or higher)

uv (Optional but recommended Python package manager)

An NVIDIA API Key (for LangChain integration)

🚀 Setup & Installation
1. Clone the repository
Bash
git clone [https://github.com/Hariharahari/Devonix.git](https://github.com/Hariharahari/Devonix.git)
cd Devonix
2. Backend Setup
Navigate to the backend directory, set up your environment variables, and install dependencies.

Bash
cd backend
Create a .env file inside the backend folder and add your API key:

Code snippet
NVIDIA_API_KEY=your_nvidia_api_key_here
Install the required Python packages:

Bash
uv pip install -r requirements.txt
# OR if using standard pip: pip install -r requirements.txt
3. Frontend Setup
Open a new terminal and navigate to the frontend directory to install the Node modules. (Note: Sandpack automatically handles React dependencies in the browser, so you only need to run this once for the UI itself).

Bash
cd frontend
npm install
💻 Running the Application
You need to run both the backend and frontend servers simultaneously. Open two separate terminal windows.

Terminal 1: Start the FastAPI Backend

Bash
cd backend
uv run uvicorn main:app --reload
(The backend will run on http://127.0.0.1:8000)

Terminal 2: Start the React Frontend

Bash
cd frontend
npm run dev
(The frontend will run on http://localhost:5173)