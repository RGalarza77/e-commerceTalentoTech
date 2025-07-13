import "../estilos/ProductoDetalle.css";
import { dispararAlerta } from "../assets/SweetAlet";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCarritoContext } from "../contextos/CarritoContext";


export default function ProductoDetalle({  }) {
    const {agregarAlCarrito} = useCarritoContext();
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    //llamada a la API
    useEffect(() => {
        fetch("https://682e9336746f8ca4a47d86df.mockapi.io/Productos")
            .then((res) => res.json())
            .then((datos) => {
                const productoEncontrado = datos.find((item) => item.id === id);
                if (productoEncontrado) {
                    setProducto(productoEncontrado);
                } else {
                    setError("Producto no encontrado.");
                }
                setCargando(false);
            })
            .catch((err) => {
                console.log("Error:", err);
                setError("Hubo un error al obtener el producto.");
                setCargando(false);
            });
    }, [id]); //[id] permite que el useEffect se ejecute cada vez que cambia un id

    /*funciones*/
    function agregarProducto() {
        if (cantidad < 1) return;
        dispararAlerta("Producto Agregado", "Producto agregado al carrito", "success", "Ok");

        producto.cantidad = cantidad;
        agregarAlCarrito(producto);
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
    if (!producto) return null;

    return (
        <div className="detalle-contenedor">
            <img className="detalle-imagen" src={producto.imagen} alt={producto.nombre} />
            <div className="detalle-info">
                <h2>{producto.nombre}</h2>
                <p>{producto.descripcion}</p>
                <p>{producto.precio} $</p>
                <div className="detalle-contador">
                    <button onClick={restarCantidad}>-</button>
                    <span>{cantidad}</span>
                    <button onClick={sumarCantidad}>+</button>
                </div>
                <button className="detalle-agregarCarrito" onClick={agregarProducto}>Agregar al carrito</button>
            </div>
        </div>
    );
}