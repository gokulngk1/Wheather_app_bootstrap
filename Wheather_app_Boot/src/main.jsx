import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TempProvider } from './context/TempContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';  


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TempProvider>
      <App />
    </TempProvider>
  </StrictMode>,
)
