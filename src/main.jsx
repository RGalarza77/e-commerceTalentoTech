import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contextos/AuthContext.jsx'
import { CarritoProvider } from './contextos/CarritoContext.jsx'
import { ProductosProvider } from './contextos/ProductosContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductosProvider>
      <AuthProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </AuthProvider>
    </ProductosProvider>
  </StrictMode>,
)
