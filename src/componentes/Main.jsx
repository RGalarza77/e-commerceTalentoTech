import React from 'react';
import { Helmet } from 'react-helmet';


function Main() {

    return (
        <main style={{ padding: "20px" }}>
            {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
            <Helmet>
                <title>Pagina Principal| E-commerce</title>
                <meta name="description" content="Pagina principa de nuertro e-commerce." />
            </Helmet>
            <h2>Contenido Principal</h2>
            <p>Este es un ejemplo de contenido dentro del área principal.</p>
        </main>
    );
}

export default Main;