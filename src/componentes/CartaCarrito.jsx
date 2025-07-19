import React from "react";
import "../estilos/CarritoCarta.css"
import Swal from 'sweetalert2';

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
        <div className="carritoCarta-contenedor">
            <h3>{producto.nombre}</h3>
            <img src={producto.imagen} alt="imagen producto" className="carritoCarta-imagen" />
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
            <p>${producto.cantidad * producto.precio}</p>

            <button onClick={borrarDelCarrito}>X</button>
        </div>
    );

}
