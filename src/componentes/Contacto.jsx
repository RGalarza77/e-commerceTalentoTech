import React from "react";
import { Helmet } from "react-helmet";

export default function Contacto() {
    return (
        <div className="p-4 m-4 mx-auto" style={{ maxWidth: "500px" }} >
            {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
            <Helmet>
                <title>Contacto | E-commerce</title>
                <meta name="description" content="Contacto de la mi E-commerce." />
            </Helmet>
            <form className="p-4 border rounded shadow">
            <h3 className="p-4">Contacto</h3>
                <div class="form-floating mb-3">
                    <input type="email" className="form-control form-control-sm h-10" id="floatingInput" placeholder="Ingresa tu email" required />
                    <label htmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control form-control-sm h-10" id="floatingPassword" placeholder="********" required />
                    <label htmlFor="floatingInput">Contraseña</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea class="form-control form-control-sm h-65" placeholder="Deja tu comentario aqui ..." id="floatingTextarea"></textarea>
                    <label htmlFor="floatingTextarea">Comentario</label>
                </div>

                <button className="btn btn-success w-25">Ingresar</button>
            </form>

        </div>
    );
} 