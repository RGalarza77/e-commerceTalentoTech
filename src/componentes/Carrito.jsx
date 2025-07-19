import { useEffect, useState } from "react";
import "../estilos/Carrito.css"
import CartaCarrito from "./CartaCarrito";
import { Navigate } from 'react-router-dom';
import { useAuthContext } from "../contextos/AuthContext";
import { useCarritoContext } from "../contextos/CarritoContext";
import { Helmet } from "react-helmet";

export default function Carrito() {
    const { usuario } = useAuthContext();
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useCarritoContext();

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.precio * producto.cantidad, 0
    );

    function funcionDisparadora(id) {
        borrarProductoCarrito(id);
    }

    if (!usuario) {
        return (
            <Navigate to="/login" replace />
        )
    }

    return (
        <div className="carrito-contenedor">
            {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
            <Helmet>
                <title>Carrito | E-commerce</title>
                <meta name="description" content="Carrito de nuetro E-commerce." />
            </Helmet>
            <div className="carrito-titulos">
                <h2>Nombre</h2>
                <h2>Imagen</h2>
                <h2>Descripción</h2>
                <h2>Precio Unitario</h2>
                <h2>Precio Total</h2>
            </div>
            {
                productosCarrito.length > 0 ?
                    productosCarrito.map((producto) => (
                        <CartaCarrito
                            producto={producto}
                            funcionBorrar={funcionDisparadora}
                        />
                    ))
                    : <p>Carrito Vacio</p>
            }
            {
                total > 0 ?
                    <h1 className="carrito-totalAPagar">Total a pagar: ${total} </h1>
                    : <></>
            }
        </div>
    );
}