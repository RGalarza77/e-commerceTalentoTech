import React from "react";
import { useAuthContext } from "../contextos/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";

export default function () {
    const { admin } = useAuthContext();

    //"RutaProtegida"- si no es Admin sera redirigido al Home
    if (!admin) {
        return (
            <Navigate to="/" replace />
        )
    }

    return (
        <div>
            <Helmet>
                <title>Administracion | E-commerce</title>
                <meta name="description" content="Menu de Administracion de nuestra tienda." />
            </Helmet>
            <h1>Menu Admin</h1>
            <ul class="list-unstyled">
                <li className=" mt-3">
                    <Link to="/admin/agregarProductos"><Button variant="dark">Agregar Producto Nuevo</Button></Link>
                </li>
                <li className=" mt-3">
                    <Link to="/admin"><Button variant="dark">Editar Producto</Button></Link>
                </li>

            </ul>

        </div>
    );
}