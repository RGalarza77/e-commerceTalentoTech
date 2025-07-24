import React, { useState, useEffect } from "react";
import "../estilos/Productos.css"
import Carta from "./Carta";
import { useProductosContext } from "../contextos/ProductosContext";
import { Helmet } from "react-helmet";
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


export default function Productos() {
    const { productos, obtenerProductos, buscarProductos } = useProductosContext();

    const productosPorPagina = 8; //para el paginador
    const [paginaActual, setPaginaActual] = useState(1); //nos indica en que pagina estamos

    // Calcular el índice de los productos a mostrar en la página actual
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto); /*Productos actuales por pagina*/

    //const [productos, setProductos] = useState([]);

    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState(""); //guarda la info del input de busqueda

    /*Importar productos desde una API*/
    {
        useEffect(() => {
            obtenerProductos().then((productos) => {
                setCargando(false);
            }).catch((error) => {
                setError('Hubo un problema al cargar los productos');
                setCargando(false);
            })
        }, []);
    }

    useEffect(() => {//--> cada vez que la variable busqueda cambie, se va a ejecutar buscarProductos()
        buscarProductos(busqueda) //--> se define en ProductosContext
    }, [busqueda])

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

    // Cambiar de página
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);


    /*Logica para mostrar Productos, mensaje Cargando o Error*/
    if (cargando) {
        return <p>Cargando productos...</p>;
    } else if (error) {
        return <p>{error}</p>;
    } else {
        return (

            <div>
                {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
                <Helmet>
                    <title>Productos | E-commerce</title>
                    <meta name="description" content="Explora nuestra variedad de productos." />
                </Helmet>

                {/* Barra de busqueda */}
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="form-control mb-3"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                {/* Productos */}
                {busqueda.length > 0 && productosActuales.length === 0 ? (
                    <p className="text-center w-100 mt-4">No se encontraron productos.</p>
                ) :
                    (
                        <Row xs={1} md={2} lg={4} className="g-4"> {/*tamaño filas para pantallas xs=chicas;md=medianas lg=grandes*/}
                            {productosActuales.map((producto) => (
                                <Col>
                                    <Carta producto={producto} />
                                </Col>
                            ))
                            }
                        </Row>
                    )
                }

                {/* Paginador */}
                <div className="d-flex justify-content-center my-4">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => cambiarPagina(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

            </div>

        )
    }
}