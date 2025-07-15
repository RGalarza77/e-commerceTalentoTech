import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './layouts/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import Carrito from './componentes/Carrito'
import Productos from './componentes/Productos'
import Nav from './componentes/Nav'
import About from './componentes/About'
import Contacto from './componentes/Contacto'
import ProductoDetalle from './componentes/ProductoDetalle'
import Admin from './componentes/Admin'
import Login from './componentes/Login'
import FormularioProducto from './componentes/FormularioProducto'
import FormularioEdicion from './componentes/FormularioEdicion'

function App() {

  return (

    <Router>
      <div>
        <Nav></Nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path='/about' element={<About />} />
          <Route path='/contacto' element={<Contacto />} />
          <Route path='/productos/:id' element={<ProductoDetalle />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/agregarProductos' element={<FormularioProducto/> }/>
          <Route path='/admin/editarProducto/:id' element={<FormularioEdicion/> }/>
        </Routes>

      </div>
    </Router>
  )
}

export default App
