import React from "react";
import { useAuthContext } from "../contextos/AuthContext";
import { Navigate } from "react-router-dom";

export default function(){
    const {usuario} = useAuthContext();

    if(!usuario){
        return(
            <Navigate to="/login" replace/>
        )
    }

    return(
        <div>
            <h1>Menu Admin</h1>
        </div>
    );
}