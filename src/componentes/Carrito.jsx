import { useEffect, useState } from "react";
import "../estilos/Carrito.css"
import CartaCarrito from "./CartaCarrito";
import { Navigate } from 'react-router-dom';
import { useAuthContext } from "../contextos/AuthContext";
import { useCarritoContext } from "../contextos/CarritoContext";
import { Helmet } from "react-helmet";
import { Row, Col, Container, Button } from "react-bootstrap";

export default function Carrito() {
    const { usuario } = useAuthContext();
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useCarritoContext();

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.precio * producto.cantidad, 0
    );

    function funcionDisparadora(id) {
        borrarProductoCarrito(id);
    }

    function funcionVaciarCarrito() {
        vaciarCarrito();
    }

    if (!usuario) {
        return (
            <Navigate to="/login" replace />
        )
    }

    return (
        <Container className="my-4">

            {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
            <Helmet>
                <title>Carrito | E-commerce</title>
                <meta name="description" content="Carrito de nuetro E-commerce." />
            </Helmet>

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
                    <div>
                        <h4 className="mt-4 text-end">Total a pagar: ${total} </h4>

                        <Button variant="warning" className="mb-4" onClick={funcionVaciarCarrito}>
                            Vaciar carrito
                        </Button>

                    </div>
                    : 
                    <></>
            }

        </Container>
    );
}