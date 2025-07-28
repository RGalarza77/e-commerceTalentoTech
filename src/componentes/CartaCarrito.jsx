import React from "react";
import "../estilos/CarritoCarta.css"
import Swal from 'sweetalert2';
import { Card, Row, Col, Button } from "react-bootstrap";

export default function CartaCarrito({ producto, funcionBorrar }) {

    function borrarDelCarrito() {

        Swal.fire({
            title: "Borrar Producto",
            text: "¿Desea eliminar el produto del carrito?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminarlo"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Producto Eliminado",
                    text: "Producto eliminado con exito",
                    icon: "success"
                });
                funcionBorrar(producto.id);
            }
        });


    }

    return (

        // <div className="carritoCarta-contenedor">
        //     <h3>{producto.nombre}</h3>
        //     <img src={producto.imagen} alt="imagen producto" className="carritoCarta-imagen" />
        //     <p>{producto.descripcion}</p>
        //     <p>${producto.precio}</p>
        //     <p>${producto.cantidad * producto.precio}</p>

        //     <button onClick={borrarDelCarrito}>X</button>
        // </div>

        <Card className="carritoCarta-contenedor mb-3 ">
        <Card.Body>
            <Row className="align-items-center">
            <Col md={3}>
                <Card.Img
                variant="top"
                src={producto.imagen}
                style={{ maxHeight: "100px", objectFit: "cover", width: "100%" }}
                />
            </Col>
            <Col md={2}>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text className="text-muted">{producto.descripcion}</Card.Text>
            </Col>
            <Col md={1}>
                <span>Cant: {producto.cantidad}</span>
            </Col>
            <Col md={2}>
                <span>Precio: {producto.precio} $</span>
            </Col>
            <Col md={2}>
                <span>Subtotal: {producto.cantidad * producto.precio} $</span>
            </Col>
            <Col md={2}>
                <Button className="btn btn-danger rounded-pill" onClick={borrarDelCarrito}>
                X
                </Button>
            </Col>
            </Row>
        </Card.Body>
        </Card>
    );

}
