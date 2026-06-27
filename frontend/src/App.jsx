import { useState, useEffect, useRef } from 'react';
import { Send, Code, Loader2, RefreshCw, ChevronDown, Check, AlertCircle, Eye, FileJson } from 'lucide-react';
import { SandpackProvider, SandpackLayout, SandpackPreview, SandpackCodeEditor, SandpackFileExplorer } from "@codesandbox/sandpack-react";

// --- STREAMING CENTER DISPLAY ---
function StreamingCenter({ isGenerating, streamingMessages, onClose }) {
  if (!isGenerating && streamingMessages.length === 0) return null;

  const hasError = streamingMessages.some(msg => msg.status === 'error');
  const isComplete = streamingMessages.some(msg => msg.status === 'complete');

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40 pointer-events-auto">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-2xl w-11/12 shadow-2xl max-h-[70vh] overflow-y-auto">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            {hasError ? (
              <>
                <AlertCircle className="w-6 h-6 text-red-500" />
                Generation Error
              </>
            ) : isComplete ? (
              <>
                <Check className="w-6 h-6 text-green-500" />
                Code Generated
              </>
            ) : (
              <>
                <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                Generating Code
              </>
            )}
          </h2>
        </div>

        {/* Messages */}
        <div className="space-y-4 mb-6">
          {streamingMessages.map((msg, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {msg.status === 'complete' || msg.status === 'file_written' || msg.status === 'files_complete' ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : msg.status === 'error' ? (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ) : msg.status === 'started' || msg.status === 'files_read' || msg.status === 'generating' ? (
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                ) : (
                  <div className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm leading-relaxed font-mono ${
                  msg.status === 'error' 
                    ? 'text-red-400' 
                    : msg.status === 'complete' 
                    ? 'text-green-400' 
                    : 'text-gray-300'
                }`}>
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          {isComplete && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
            >
              View Generated Code
            </button>
          )}
          {hasError && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- 1. FULL SCREEN REMOTE PREVIEW WITH CODE TOGGLE (FIXED HEIGHT) ---
function RemotePreview({ projectName, refreshTrigger }) {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('preview');

  useEffect(() => {
    if (!projectName) return;
    
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://127.0.0.1:8000/project/${projectName}`);
        if (!res.ok) throw new Error("Project not found yet.");
        const data = await res.json();
        setFiles(data.files);
        setError(null);
      } catch (err) {
        setError(err.message);
        setFiles(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [projectName, refreshTrigger]);

  if (loading) return <div className="flex h-full items-center justify-center text-blue-400 bg-gray-950"><Loader2 className="animate-spin mr-2" /> Loading Preview...</div>;
  if (error) return <div className="flex h-full items-center justify-center text-gray-500 bg-gray-950 text-sm">{error}</div>;
  if (!files) return <div className="flex h-full items-center justify-center text-gray-600 bg-gray-950">Create a new project or select one to start.</div>;

  return (
    <div className="h-full w-full bg-gray-900 flex flex-col">
      
      {/* View Toggle Header */}
      <div className="flex items-center justify-center gap-2 bg-[#0d1117] p-2 border-b border-gray-800 shrink-0">
        <div className="bg-gray-900 p-1 rounded-lg border border-gray-800 flex">
          <button 
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'preview' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye size={16} /> Preview
          </button>
          <button 
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'code' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileJson size={16} /> Code
          </button>
        </div>
      </div>

      {/* Sandpack Container (Using absolute inset to force full height) */}
      <div className="flex-1 relative">
        <SandpackProvider 
          template="react"
          theme="dark"
          files={files}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
          customSetup={{
            dependencies: {
              "lucide-react": "latest",
              "react-router-dom": "latest"
            }
          }}
        >
          <SandpackLayout style={{ 
              position: "absolute",
              top: 0, bottom: 0, left: 0, right: 0,
              border: "none", 
              borderRadius: 0 
          }}>
            {viewMode === 'preview' ? (
              <SandpackPreview 
                style={{ height: "100%", width: "100%" }} 
                showNavigator={true} 
                showOpenInCodeSandbox={false} 
              />
            ) : (
              <>
                <SandpackFileExplorer style={{ height: "100%", width: "250px" }} />
                <SandpackCodeEditor 
                  style={{ height: "100%", flex: 1 }} 
                  showTabs={true} 
                  showLineNumbers={true}
                  wrapContent={true}
                />
              </>
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}

// --- 2. CHAT INTERFACE ---
function BuilderChat() {
  const [prompt, setPrompt] = useState("");
  const [projectName, setProjectName] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Ready to code. Select or create a project to start.", isStreaming: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); 
  const [streamingMessages, setStreamingMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/projects");
        const data = await res.json();
        setProjects(data.projects || []);
        if (data.projects && data.projects.length > 0) {
          setProjectName(data.projects[0]);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // --- LOAD CHAT HISTORY FROM DATABASE ---
  useEffect(() => {
    if (!projectName || projectName === "__new__") return;

    const loadHistory = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/history/${projectName}`);
        if (!res.ok) throw new Error("Failed to fetch history");
        
        const data = await res.json();
        
        if (data.history && data.history.length > 0) {
          const formattedHistory = data.history.map(msg => ({
            ...msg,
            isStreaming: false
          }));
          setMessages(formattedHistory);
        } else {
          setMessages([{ role: 'ai', text: "Ready to code. What are we building?", isStreaming: false }]);
        }
      } catch (e) {
        console.error("Failed to load history", e);
        setMessages([{ role: 'ai', text: "Ready to code. What are we building?", isStreaming: false }]);
      }
    };
    
    loadHistory();
  }, [projectName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    setProjectName(newProjectName);
    setNewProjectName("");
    setShowNewProject(false);
    if (!projects.includes(newProjectName)) {
      setProjects([...projects, newProjectName]);
    }
  };

  const handleCloseStreaming = () => {
    if (isGenerating) return; // Don't close while generating
    setStreamingMessages([]);
    setRefreshKey(prev => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !projectName.trim()) {
      if (!projectName.trim()) {
        setMessages(prev => [...prev, { role: 'ai', text: "Please enter or select a project name first.", isStreaming: false }]);
      }
      return;
    }

    const newMsg = { role: 'user', text: prompt };
    setMessages(prev => [...prev, newMsg]);
    setPrompt("");
    
    // Show streaming center
    setIsGenerating(true);
    setStreamingMessages([]);
    
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newMsg.text, project_name: projectName })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              setStreamingMessages(prev => [...prev, {
                status: data.status,
                message: data.message,
                type: data.type || 'status'
              }]);
              
              // When complete, close streaming and refresh preview
              if (data.status === 'complete') {
                setIsGenerating(false);
                setRefreshKey(prev => prev + 1);
                setTimeout(() => {
                  setMessages(prev => [...prev, { 
                    role: 'ai', 
                    text: `✨ ${data.message}`, 
                    isStreaming: false 
                  }]);
                }, 500);
              }
            } catch (e) {
              console.error('Parse error:', e);
            }
          }
        }
      }
    } catch (error) {
      setIsGenerating(false);
      setStreamingMessages(prev => [...prev, { 
        status: 'error', 
        message: `Error: ${error.message}`,
        type: 'error'
      }]);
      setMessages(prev => [...prev, { role: 'ai', text: `❌ Error: ${error.message}`, isStreaming: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans overflow-hidden">
      
      {/* STREAMING CENTER OVERLAY */}
      <StreamingCenter 
        isGenerating={isGenerating}
        streamingMessages={streamingMessages}
        onClose={handleCloseStreaming}
      />
      
      {/* LEFT: CHAT SIDEBAR */}
      <div className="w-[400px] flex flex-col border-r border-gray-800 bg-gray-950 shadow-xl z-10 shrink-0">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h1 className="font-bold text-lg flex items-center gap-2">
            <Code className="text-blue-500 w-5 h-5" /> DEVONIX
          </h1>
          <div className="flex gap-2">
            {/* Project Dropdown */}
            <div className="relative">
              <select 
                value={projectName}
                onChange={(e) => {
                  if (e.target.value === "__new__") {
                    setShowNewProject(true);
                  } else {
                    setProjectName(e.target.value);
                  }
                }}
                className="bg-gray-900 text-xs px-2 py-1.5 rounded text-gray-300 border border-gray-800 w-32 focus:border-blue-500 outline-none transition-colors appearance-none pr-6 cursor-pointer"
              >
                {projects.map(proj => (
                  <option key={proj} value={proj}>{proj}</option>
                ))}
                <option value="__new__">+ New Project</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 w-3 h-3 text-gray-500 pointer-events-none" />
            </div>
            
            <button onClick={() => setRefreshKey(p => p+1)} className="p-1.5 hover:bg-gray-800 rounded text-gray-400 hover:text-white transition-colors">
                <RefreshCw className="w-4 h-4"/>
            </button>
          </div>
        </div>

        {/* New Project Modal */}
        {showNewProject && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 rounded">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 w-80 shadow-lg">
              <h2 className="font-bold text-white mb-3">Create New Project</h2>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Enter project name..."
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 outline-none mb-3"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setShowNewProject(false);
                    setNewProjectName("");
                  }}
                  className="px-3 py-1.5 text-sm rounded hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateProject}
                  className="px-3 py-1.5 text-sm bg-blue-600 rounded hover:bg-blue-500 transition-colors text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-sm' 
                  : 'bg-gray-900 text-gray-300 border border-gray-800 rounded-bl-sm'
              }`}>
                <div className="whitespace-pre-wrap font-mono text-xs">{msg.text}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-800 bg-gray-950 shrink-0">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe changes..."
              className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-600"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT: FULL PREVIEW */}
      <div className="flex-1 min-w-0 bg-gray-900">
        <RemotePreview projectName={projectName} refreshTrigger={refreshKey} />
      </div>

    </div>
  );
}

export default BuilderChat;