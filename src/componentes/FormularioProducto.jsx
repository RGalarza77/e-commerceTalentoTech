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

    return (<form onSubmit={handleSubmit2}>

      {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
      <Helmet>
        <title>Agregar Producto | E-commerce</title>
        <meta name="description" content="Agregar nuevos productos." />
      </Helmet>

      <h2>Agregar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
      </div>
      <div>
        <label>Imagen:</label>
        <input
          type="text" name="imagen" value={producto.imagen} onChange={handleChange} required />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" name="precio" value={producto.precio} onChange={handleChange} required
          min="0" />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Agregar Producto</button>
      <ToastContainer />
    </form>
    );
  }


}

export default FormularioProducto;