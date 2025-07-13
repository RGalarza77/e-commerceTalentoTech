import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contextos/AuthContext.jsx'
import { CarritoProvider } from './contextos/CarritoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CarritoProvider>
         <App />
      </CarritoProvider>
    </AuthProvider>
  </StrictMode>,
)
