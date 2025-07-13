import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contextos/AuthContext';
import { crearUsuario, logearseConEmail } from '../autenticacion/firebase';
import { dispararAlerta } from '../assets/SweetAlet';


export default function Login() {
    //declaro las variables useState
    const [user, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    //accedo a la propiedad 'login' del useAuthContext
    const { login, usuario, logout  } = useAuthContext();

    const navigate = useNavigate();

    //funcion handleSubmit para manejar el envio del formulario
    //Inicio de sesion
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

    function iniciarSesionConEmail(e){
        e.preventDefault();
        logearseConEmail(user, password).then((usuario) => {
            login(user) //si trajo a 'usuario', loguea a user
            dispararAlerta("Inicio de sesion exitoso!!","", "success", "Ok")
        }).catch((error) => { // si trajo error, capturo error
            //agregar un sweetAlert
            dispararAlerta("Error al iniciar sesion", "Error: "+error, "error", "Cerrar");
        })
    }

    //cerrar sesion
    const cerrarSesion= (e) => {
        logout()
    }

    //Registrar usuario con email y contraseña
    function registrarUsuario(e) {
        e.preventDefault();
        crearUsuario(user, password).then((usuario) => {
            login(user);
            dispararAlerta("Usuario creado con exito!!","", "info", "Ok")
        }).catch((error) => {
            dispararAlerta("Error al crear nuevo usuario", "Error: "+error, "error", "Cerrar");
        })
    }

    //si un usuario valido se logueo, aprece el boton cerrar sesion 
    if(usuario){
        return(
            <form onSubmit={cerrarSesion}>
                <button type='submit'>Cerrar Sesion</button>
            </form>
        )
    }

    return (
        <div>
            {/* Inicio Sesion */}
            <form onSubmit={iniciarSesionConEmail}>
                <h2>Iniciar sesión</h2>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>

            {/* Registro */}
            <form onSubmit={registrarUsuario}>
            <h2>Registrarse</h2>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUsuario(e.target.value)}
                />
            </div>
            <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Registrarse</button>
        </form>


        </div>
    );
}