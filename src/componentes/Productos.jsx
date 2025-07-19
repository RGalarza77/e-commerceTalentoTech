import React, { useState, useEffect } from "react";
import "../estilos/Productos.css"
import Carta from "./Carta";
import { useProductosContext } from "../contextos/ProductosContext";
import { Helmet } from "react-helmet";


export default function Productos() {
    const { productos, obtenerProductos } = useProductosContext();
    //const [productos, setProductos] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    { /*Importar datos desde una API*/
        useEffect(() => {
            obtenerProductos().then((productos) => {
                setCargando(false);
            }).catch((error) => {
                setError('Hubo un problema al cargar los productos');
                setCargando(false);
            })
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
                {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
                <Helmet>
                    <title>Productos | E-commerce</title>
                    <meta name="description" content="Explora nuestra variedad de productos." />
                </Helmet>

                {productos.map((producto) => (
                    <Carta producto={producto} />
                ))}
            </div>

        )
    }
}