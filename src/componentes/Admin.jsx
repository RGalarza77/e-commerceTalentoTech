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
            <Link to="/admin/agregarProductos"><Button>Agregar Producto Nuevo</Button></Link>
            <Link to="/admin"><Button>Editar Producto</Button></Link>
        </div>
    );
}