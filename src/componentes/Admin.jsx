import React from "react";
import { useAuthContext } from "../contextos/AuthContext";
import { Navigate } from "react-router-dom";

export default function(){
    const {admin} = useAuthContext();

    //"RutaProtegida"- si no es Admin sera redirigido al Home
    if(!admin){
        return(
            <Navigate to="/" replace/>
        )
    }

    return(
        <div>
            <h1>Menu Admin</h1>
        </div>
    );
}