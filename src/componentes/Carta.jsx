import React, { useState } from "react";
import "../estilos/Carta.css"
import {Link, Navigate} from "react-router-dom";

export default function Carta({producto}) {
    

    return (
        // <Link to={"/productos/"+producto.id}>
        <div className="carta-contenedor">
            <img src={producto.imagen} alt="imagen producto" className="carta-imagen" />
            <h3 className="carta-nombre">{producto.nombre}</h3>
            <h4 className="carta-precio">${producto.precio}</h4>

            <Link to={"/productos/"+producto.id}><button className="carta-boton">Ver detalles</button> </Link>
        </div>
        // </Link>
    );

}
