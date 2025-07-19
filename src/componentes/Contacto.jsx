import React from "react";
import { Helmet } from "react-helmet";

export default function Contacto() {
    return (
        <div>
            {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
            <Helmet>
                <title>Contacto | E-commerce</title>
                <meta name="description" content="Contacto de la mi E-commerce." />
            </Helmet>
            <h2>Contacto</h2>
            <ul>
                <li>Redes Sociales </li>
                <li>Dirección</li>
                <li>E-mail</li>

            </ul>


        </div>
    );
} 