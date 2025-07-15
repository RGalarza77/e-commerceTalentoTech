import "../estilos/ProductoDetalle.css";
import { dispararAlerta } from "../assets/SweetAlet";
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCarritoContext } from "../contextos/CarritoContext";
import { useAuthContext } from "../contextos/AuthContext";
import { useProductosContext } from "../contextos/ProductosContext";


export default function ProductoDetalle({  }) {
    const {agregarAlCarrito} = useCarritoContext();
    const { id } = useParams();
    const {obtenerProducto, productoEncontrado} = useProductosContext();
    const [cantidad, setCantidad] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const {admin} =useAuthContext();

    //llamada a la API
    useEffect(() => {
        obtenerProducto(id).then(() =>{
            setCargando(false);
        }).catch((error) => {
            if(error == "Producto no encontrado") setError("Producto no encontrado");
            if(error == "Hubo un error al obtener el producto") setError("Hubo un error al obtener el producto");
            setCargando(false);
        })
    }, [id]); //[id] permite que el useEffect se ejecute cada vez que cambia un id

    /*funciones*/
    function agregarProducto() {
        if (cantidad < 1) return;
        dispararAlerta("Producto Agregado", "Producto agregado al carrito", "success", "Ok");

        productoEncontrado.cantidad = cantidad;
        agregarAlCarrito(productoEncontrado);
    }

    function restarCantidad() {
        if (cantidad > 1) { setCantidad(cantidad - 1) };
    }

    function sumarCantidad() {
        setCantidad(cantidad + 1);
    }

    /*respuestas del fetch*/
    if (cargando) return <p>Cargando producto...</p>;
    if (error) return <p>{error}</p>;
    if (!productoEncontrado) return null;

    return (
        <div className="detalle-contenedor">
            <img className="detalle-imagen" src={productoEncontrado.imagen} alt={productoEncontrado.nombre} />
            <div className="detalle-info">
                <h2>{productoEncontrado.nombre}</h2>
                <p>{productoEncontrado.descripcion}</p>
                <p>{productoEncontrado.precio} $</p>
                <div className="detalle-contador">
                    <button onClick={restarCantidad}>-</button>
                    <span>{cantidad}</span>
                    <button onClick={sumarCantidad}>+</button>
                </div>
                {admin ? <Link to={"/admin/editarProducto/"+id}><button className="detalle-agregarCarrito">Editar Producto</button> </Link> : 
                <button className="detalle-agregarCarrito" onClick={agregarProducto}>Agregar al carrito</button>}
            </div>
        </div>
    );
}