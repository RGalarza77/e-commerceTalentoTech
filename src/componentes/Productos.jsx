import React, { useState, useEffect } from "react";
import "../estilos/Productos.css"
import Carta from "./Carta";

export default function Productos() {
    const [productos, setProductos] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    { /*Importar datos desde una API*/
        useEffect(() => {
            fetch('https://682e9336746f8ca4a47d86df.mockapi.io/Productos')
                .then((respuesta) =>
                    respuesta.json()
                ).then((datos) => {
                    console.log(datos);
                    setProductos(datos);
                    setCargando(false);
                })
                .catch((error) => {
                    console.log("Error", error);
                    setError('Hubo un problema al cargar los productos');
                    setCargando(false);
                });
        }, []);
    }

    /*Funcion que se pasa a Carrito para agregar productos*/
    // function funcionCarrito(producto) {
    //     const existe= productosCarrito.find(p=> p.id === producto.id);
    //     if(existe){
    //         const carritoActualizado= productosCarrito.map((p)=>{
    //             if(p.id === producto.id){
    //                 var cantidad= p.cantidad + producto.cantidad;
    //                 const productoActualizado = {...p,cantidad: p.cantidad + producto.cantidad};
    //                 return productoActualizado;
    //             }else{
    //                 return p;
    //             }
    //         })
    //         setProductosCarrito(carritoActualizado);
    //     }else{

    //         const auxCarrito = [...productosCarrito, producto]; /*...descompone cada elemento del array y agrega 'producto' al final*/
    //         setProductosCarrito(auxCarrito);
    //         // console.log(productosCarrito)
    //     }
    //     setTotal(0);
    //     productosCarrito.map((p => {
    //         setTotal(total + p.precio * p.cantidad);
    //     }))
    // }
    

    /*Logica para mostrar Productos, mensaje Cargando o Error*/
    if (cargando) {
        return <p>Cargando productos...</p>;
    } else if (error) {
        return <p>{error}</p>;
    } else {
        return (
            <div className="productos-contenedor">
                {productos.map((producto) => (
                    <Carta producto={producto}/>
                ))}
            </div>

        )
    }
}