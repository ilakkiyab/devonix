import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react" // <--- Import Provider
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <main className="dark text-foreground bg-background min-h-screen">
          <App />
        </main>
      </BrowserRouter>
    </HeroUIProvider>
  </React.StrictMode>,
)