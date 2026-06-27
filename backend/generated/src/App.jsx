import { Routes, Route, useParams } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';

// 1. AUTO-DISCOVERY: Find all projects in the folder
const projects = import.meta.glob('./projects/*/App.jsx');

function ProjectLoader() {
  const { name } = useParams();
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    // 2. DYNAMIC IMPORT: Load the requested project
    const loader = projects[`./projects/${name}/App.jsx`];
    
    if (!loader) {
      setComponent(() => () => (
        <div className="flex h-screen items-center justify-center text-red-500 bg-black">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Project Not Found</h1>
            <p className="font-mono mt-2">backend/generated/src/projects/{name}/App.jsx</p>
            <p className="text-sm text-gray-500 mt-4">Tip: Check if the folder exists.</p>
          </div>
        </div>
      ));
      return;
    }

    loader().then((mod) => {
      setComponent(() => mod.default);
    });
  }, [name]);

  if (!Component) return <div className="text-white p-10">Loading...</div>;
  return <Component />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div className="text-white p-10">Welcome to TaskForce.</div>} />
      <Route path="/project/:name" element={<ProjectLoader />} />
    </Routes>
  );
}