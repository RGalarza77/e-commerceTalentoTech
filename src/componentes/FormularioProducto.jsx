import React, { useState } from 'react';
import { dispararAlerta } from '../assets/SweetAlet';
import { useAuthContext } from '../contextos/AuthContext';
import { Navigate } from 'react-router-dom';
import { useProductosContext } from '../contextos/ProductosContext';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormularioProducto({ }) {
  const { agregarProducto } = useProductosContext();
  const { admin } = useAuthContext();

  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    image: ''
  });

  /*Validaciones*/

  const validarFormulario = () => {

    if (!producto.nombre.trim()) {
      return ('El nombre es obligatorio.');
    }
    if (!producto.precio || producto.precio <= 0) {
      return ('El precio debe ser mayor a 0.');
    }
    if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
      return ('La descripción debe tener al menos 10 caracteres.');
    }
    if (!producto.imagen.trim()) {
      return ('La URL de la imagen no debe estas vacia');
    } else {
      return true;
    }
  };

  /*Funciones*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   agregarProducto(producto).then((data) => {// Llamada a la función para agregar el producto
  //     setProducto({ nombre: '', precio: '', descripcion: '' }); // Limpiar el formulario
  //   }).catch((error) => {
  //     dispararAlerta('Error al agregar el producto', error, "error", "Cerrar");
  //   })
  // };


  //handleSubmit con validaciones
  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (validarFormulario() == true) {
      agregarProducto(producto).then((data) => {// Llamada a la función para agregar el producto
        setProducto({ nombre: '', precio: '', descripcion: '', imagen: '' }); // Limpiar el formulario
        toast.success("Producto agregado correctamente!");
      }).catch((error) => {
        dispararAlerta('Error al agregar el producto', error, "error", "Cerrar");
      })
    } else {
      dispararAlerta('Error al agregar el producto', validarFormulario(), "error", "Cerrar");
    }
  };

  //"RutaProtegida"- Si no es Admin sera redirigido al Home 
  if (!admin) {
    return (
      <Navigate to="/" replace />
    )
  } else {

    return (
      < div className='d-flex flex-column align-items-center min-vh-100' >

        {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
        <Helmet>
          <title>Agregar Producto | E-commerce</title>
          <meta name="description" content="Agregar nuevos productos." />
        </Helmet>

        <div className='col-12 col-sm-10 col-md-6 col-lg-4'>
          <form onSubmit={handleSubmit2} className=" d-flex flex-column justify-content-center align-items-center p-4 border rounded shadow">
            <h2 className="mb-5">Agregar Producto</h2>
            <div className="mb-3">
              <label className="form-label">Nombre:</label>
              <input className="form-control" type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Imagen:</label>
              <input className="form-control" type="text" name="imagen" value={producto.imagen} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Precio:</label>
              <input className="form-control" type="number" name="precio" value={producto.precio} onChange={handleChange} required
                min="0" />
            </div>

            <div className="mb-4">
              <label className="form-label">Descripción:</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={producto.descripcion}
                onChange={handleChange}
                required
              />
            </div>
            <button className="btn btn-dark mt-4 mb-4" type="submit">Agregar Producto</button>
            <ToastContainer />
          </form>

        </div>


      </div>

    );
  }


}

export default FormularioProducto;