import "../estilos/ProductoDetalle.css";
import { dispararAlerta } from "../assets/SweetAlet";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCarritoContext } from "../contextos/CarritoContext";
import { useAuthContext } from "../contextos/AuthContext";
import { useProductosContext } from "../contextos/ProductosContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Col, Row } from "react-bootstrap";



export default function ProductoDetalle({ }) {
    const navegar = useNavigate();

    const { agregarAlCarrito } = useCarritoContext();
    const { id } = useParams();
    const { obtenerProducto, productoEncontrado, eliminarProducto } = useProductosContext();
    const [cantidad, setCantidad] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const { admin } = useAuthContext();

    //llamada a la API
    useEffect(() => {
        obtenerProducto(id).then(() => {
            setCargando(false);
        }).catch((error) => {
            if (error == "Producto no encontrado") setError("Producto no encontrado");
            if (error == "Hubo un error al obtener el producto") setError("Hubo un error al obtener el producto");
            setCargando(false);
        })
    }, [id]); //[id] permite que el useEffect se ejecute cada vez que cambia un id

    /*funciones*/
    function dispararEliminar() {
        eliminarProducto(id).then(() => {
            navegar("/productos"); /*redirecciona a la ventana productos al eliminar*/
        }).catch((error) => {
            dispararAlerta("Error Eliminar Producto", "Hubo un problema al eliminar el producto." + error.message, "error", "Ok");
        })
    }

    function agregarProducto() {
        if (cantidad < 1) return;
        toast.success("Producto agregado al carrito!");


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
            <Row xs={1} md={2} className="align-items-center" >
                <Col>
                    <img className="detalle-imagen img-fluid"  src={productoEncontrado.imagen} alt={productoEncontrado.nombre} />
                </Col>
                <Col>
                    <div className="detalle-info">
                        <h2>{productoEncontrado.nombre}</h2>
                        <p className="text-body-secondary">{productoEncontrado.descripcion}</p>
                        <p className="fw-bolder">{productoEncontrado.precio} $</p>
                        <div className="detalle-contador mb-5">
                            <button className="btn btn-outline-dark" onClick={restarCantidad}>-</button>
                            <span>{cantidad}</span>
                            <button className="btn btn-outline-dark" onClick={sumarCantidad}>+</button>
                        </div>
                        {admin ? <Link to={"/admin/editarProducto/" + id}><button className="detalle-agregarCarrito">Editar Producto</button> </Link> :
                            <button className="detalle-agregarCarrito" onClick={agregarProducto}>Agregar al carrito</button>}
                        {admin ? <button className="detalle-agregarCarrito" onClick={dispararEliminar}>Eliminar producto</button> : <></>}
                    </div>

                </Col>

            </Row>
            <ToastContainer />
        </div>
    );
}