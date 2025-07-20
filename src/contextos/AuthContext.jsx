import React, { createContext, useState, useContext } from 'react';
import { logearseConGmail } from '../autenticacion/firebase';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Crear el contexto de autenticación
const AuthContext = createContext();

//Proveedor del contexto
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [admin, setAdmin] = useState(false);

  const login = (nombreUsuario) => {
    // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
    const token = `falso-token-${nombreUsuario}`;

    //Logueo del administrador
    if (nombreUsuario == "admin@gmail.com") { // pass: test12
      setAdmin(true);
    }

    localStorage.setItem('authToken-ecommerce', token);
    setUsuario(nombreUsuario);
  };

  const logout = () => {
    localStorage.removeItem('authToken-ecommerce');
    setUsuario(null);
    setAdmin(false);
  };

  function loginGmail() {
    logearseConGmail().then((data) => {
      const token = `falso-token-${data.email}`;
      setUsuario(data.email);
      localStorage.setItem('authToken-ecommerce', token);
    }).catch((error) => {
      toast.error("Error al iniciar session con Gmail!.");
    })
  }

  function verificacionLogueo() {
    return (
      new Promise((res, rej) => {
        const tokenUsuario = localStorage.getItem("authToken-ecommerce");
        if (tokenUsuario && tokenUsuario == "falso-token-admin@gmail.com") { //si existe el token y es el del admin
          setAdmin(true);
          return;
        }
        if (tokenUsuario) { //si existe el token
          setUsuario(tokenUsuario);
        }
      })
    );
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loginGmail, admin, verificacionLogueo }}>
      {children}
      <ToastContainer/>
    </AuthContext.Provider>);
}
export const useAuthContext = () => useContext(AuthContext);
