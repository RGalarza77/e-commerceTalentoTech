import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

//Proveedor del contexto
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const login = (nombreUsuario) => {
    // Simulando la creación de un token (en una app real, esto sería generado por un servidor)
    const token = `falso-token-${nombreUsuario}`;

    localStorage.setItem('authToken-ecommerce', token);
    setUsuario(nombreUsuario);
  };

  const logout = () => {
    localStorage.removeItem('authToken-ecommerce');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider> );
}
export const useAuthContext = () => useContext(AuthContext);
