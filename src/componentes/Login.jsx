import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contextos/AuthContext';
import { crearUsuario, logearseConEmail } from '../autenticacion/firebase';
import { dispararAlerta } from '../assets/SweetAlet';
import { Helmet } from 'react-helmet';


export default function Login() {
    //declaro las variables useState
    const [user, setUsuario] = useState('');
    const [password, setContrasenia] = useState('');
    const [mostrarInicioSesion, setMostrar] = useState(true);
    //accedo a la propiedad 'login' del useAuthContext
    const { login, usuario, logout, admin, loginGmail } = useAuthContext();

    const navigate = useNavigate();

    //funcion handleSubmit para manejar el envio del formulario
    //Inicio de sesion con datos hardcodeados
    // const handleSubmit = (e) => {
    //     e.preventDefault(); // Evita que la página se recargue

    //     // Simulación de autenticación
    //     if (user === 'admin' && password === '1234') {
    //         login(user);
    //         navigate('/');
    //     } else {
    //         alert('Credenciales incorrectas');
    //     }
    // };

    //Inicio de sesion con datos de firebase (email y pass)
    function iniciarSesionConEmail(e) {
        e.preventDefault(); // Evita que la página se recargue
        logearseConEmail(user, password).then((usuario) => {
            login(user) //si trajo a 'usuario', loguea a user
            dispararAlerta("Inicio de sesion exitoso!!", "", "success", "Ok")
        }).catch((error) => { // si trajo error, capturo error
            if (error.code == "auth/invalid-credential") //Credenciales incorrectas
                dispararAlerta("Error al iniciar sesion", "Credenciales incorrectas", "error", "Cerrar");
            else //Errores por defecto
                dispararAlerta("Error al iniciar sesion", "Error: " + error, "error", "Cerrar");
        })
    }
    //Inicio de sesion con gmail
    function iniciarSesionConGmail(e){
        loginGmail();
    }

    //Registrar usuario a firebase (con email y contraseña)
    function registrarUsuario(e) {
        e.preventDefault();
        crearUsuario(user, password).then((usuario) => {
            login(user);
            dispararAlerta("Usuario creado con exito!!", "", "info", "Ok")
        }).catch((error) => {
            if (error.code == "auth/weak-password") //Contraseña debil
                dispararAlerta("Error al crear nuevo usuario", "La contraseña debe contener 6 o mas caracteres", "error", "Cerrar");
            if (error.code == "auth/email-already-in-use") //Email ya utilizado
                dispararAlerta("Error al crear nuevo usuario", "El email que intenta registrar ya esta en uso. Ingrese otro que no haya sido utilizado", "error", "Cerrar");
            else //Errores por defecto
                dispararAlerta("Error al crear nuevo usuario", "Error: " + error, "error", "Cerrar");
        })
    }

    //funcion para mostrar el form para inicio de sesion (= true) o form de registrar (=false)
    function mostrarFormulario(e) {
        e.preventDefault();
        setMostrar(!mostrarInicioSesion);
        setUsuario('');
        setContrasenia('');
    }

    //cerrar sesion
    const cerrarSesion = (e) => {
        logout();
        setUsuario('');
        setContrasenia('');
    }

    //si un usuario valido se logueo, aprece el boton cerrar sesion 
    if (usuario || admin) {
        return (
            <form onSubmit={cerrarSesion}>
                <button type='submit'>Cerrar Sesion</button>
            </form>
        )
        //Mostrar form de inicio de sesion con email
    } else if (!usuario && mostrarInicioSesion) {
        {/* Inicio Sesion */ }
        return (
            <div className='d-flex flex-column justify-content-center align-items-center '>
                {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
                <Helmet>
                    <title>Login | E-commerce</title>
                    <meta name="description" content="Login de nuestra tienda." />
                </Helmet>
                <form onSubmit={iniciarSesionConEmail} className=" d-flex flex-column justify-content-center align-items-center p-4 border rounded shadow w-50">
                    <h2 className="mb-3">Iniciar sesión</h2>
                    <div className="mb-3 w-50">
                        <label className="form-label">Email</label>
                        <input type="email" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="form-control" required />
                    </div>
                    <div className=" mb-5 w-50">
                        <label className="form-label">Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setContrasenia(e.target.value)} className="form-control" required />
                    </div>
                    <button type='submit' className="btn btn-success mb-2">Ingresar</button>
                    <button className="btn btn-dark mb-2" onClick={mostrarFormulario}>Registrarse</button>
                    <button className="btn btn-success mt-5" onClick={iniciarSesionConGmail}>Ingresar con Gmail</button>
                </form>
            </div>

            // /* form iniciar sesion sin bootstrap*/
            // <div>
            // <form onSubmit={iniciarSesionConEmail}>
            //     <h2>Iniciar sesión</h2>
            //     <div>
            //         <label>Email:</label>
            //         <input
            //             type="text"
            //             value={user}
            //             onChange={(e) => setUsuario(e.target.value)}
            //         />
            //     </div>
            //     <div>
            //         <label>Contraseña:</label>
            //         <input
            //             type="password"
            //             value={password}
            //             onChange={(e) => setContrasenia(e.target.value)}
            //         />
            //     </div>
            //     <button type="submit">Iniciar sesión</button>
            // </form>
            // <button onClick={mostrarFormulario}>Registrarse</button>

            // </div>
        );
        //Mostrar form de registro
    } else {
        {/* Registro */ }
        return (
            < div className='d-flex flex-column justify-content-center align-items-center ' >
                <Helmet>
                    <title>Registro Usuario | E-commerce</title>
                    <meta name="description" content="Registro para nuevos usuarios de nuestra e-commerce." />
                </Helmet>
                <form onSubmit={registrarUsuario} className=" d-flex flex-column justify-content-center align-items-center p-4 border rounded shadow w-50">
                    <h2>Registrarse</h2>
                    <div className="mb-3 w-50">
                        <label className="form-label">Email</label>
                        <input type="email" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="form-control" required />
                    </div>
                    <div className="mb-3 w-50">
                        <label className="form-label">Contraseña</label>
                        <input type="password" value={password} onChange={(e) => setContrasenia(e.target.value)} className="form-control" required />
                    </div>
                    <button type='submit' className="btn btn-success mb-2 ">Registrarse</button>
                    <button className="btn btn-dark" onClick={mostrarFormulario}>Iniciar Sesión</button>
                </form>
            </div>


            // /*form registro sin bootstrap */
            // <div>
            //     <form onSubmit={registrarUsuario}>
            //         <h2>Registrarse</h2>
            //         <div>
            //             <label>Email:</label>
            //             <input
            //                 type="text"
            //                 value={user}
            //                 onChange={(e) => setUsuario(e.target.value)}
            //             />
            //         </div>
            //         <div>
            //             <label>Contraseña:</label>
            //             <input
            //                 type="password"
            //                 value={password}
            //                 onChange={(e) => setContrasenia(e.target.value)}
            //             />
            //         </div>
            //         <button type="submit">Registrarse</button>
            //     </form>
            //     <button onClick={mostrarFormulario}>Iniciar Sesion</button>
            // </div >
        );
    }


}