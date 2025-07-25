import { createContext, useContext, useState } from "react";
import { dispararAlerta, dispararAlertaConConfirmacion } from "../assets/SweetAlet";

import Swal from 'sweetalert2';



const ProductosContext = createContext();

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [productoEncontrado, setProductoEncontrado] = useState([]);
    const [productosSinFiltrar, setProductosSinFiltrar] = useState([]);

    function obtenerProductos() {
        return (
            new Promise((res, rej) => {
                fetch('https://682e9336746f8ca4a47d86df.mockapi.io/Productos')
                    .then((respuesta) =>
                        respuesta.json()
                    ).then((datos) => {
                        console.log(datos);
                        setProductos(datos);
                        setProductosSinFiltrar(datos); //--> array de productos que se utiliza en la funcion de Busqueda
                        res(datos);
                    })
                    .catch((error) => {
                        console.log("Error", error);
                        rej(error);
                    });
            })
        );
    }

    /*agregar productos desde mockapi*/
    function agregarProducto(producto) {
        return new Promise(async (res, rej) => {

            try {
                const respuesta = await fetch('https://682e9336746f8ca4a47d86df.mockapi.io/Productos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(producto),
                });

                if (!respuesta.ok) {
                    throw new Error('Error al agregar el producto.');
                }
                const data = await respuesta.json();

                //dispararAlerta('Producto agregado correctamente',"", "success", "Ok" );
                res(data);
            } catch (error) {
                console.error(error.message);
                //   alert('Hubo un problema al agregar el producto.');
                rej('Hubo un problema al agregar el producto.');
            }
        })
    };

    function obtenerProducto(id) {
        return (
            new Promise((res, rej) => {
                fetch("https://682e9336746f8ca4a47d86df.mockapi.io/Productos")
                    .then((res) => res.json())
                    .then((datos) => {
                        const productoEncontrado = datos.find((item) => item.id === id);
                        if (productoEncontrado) {
                            setProductoEncontrado(productoEncontrado);
                            res(datos);
                        } else {
                            rej("Producto no encontrado");
                        }
                    })
                    .catch((err) => {
                        console.log("Error:", err);
                        rej("Hubo un error al obtener el producto");
                    });
            })
        )
    }

    function editarProducto(producto) {
        return (
            new Promise(async (res, rej) => {
                try {
                    const respuesta = await fetch(`https://682e9336746f8ca4a47d86df.mockapi.io/Productos/${producto.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(producto),
                    });
                    if (!respuesta.ok) {
                        throw new Error('Error al actualizar el producto.');
                    }
                    const data = await respuesta.json();
                    res(data);

                } catch (error) {
                    console.error(error.message);
                    rej(error);
                }
            })
        );
    }

    // function eliminarProducto(id) {
    //     const confirmar = window.confirm('¿Estás seguro de eliminar?');
    //     if (confirmar) {
    //         return (
    //             new Promise(async (res, rej) => {
    //                 try {
    //                     const respuesta = await fetch(`https://682e9336746f8ca4a47d86df.mockapi.io/Productos/${id}`, {
    //                         method: 'DELETE',
    //                     });
    //                     if (!respuesta.ok) throw new Error('Error al eliminar');
    //                     dispararAlerta('Producto Eliminado', 'Producto eliminado correctamente.', "success", "Ok");
    //                     res();
    //                 } catch (error) {
    //                     console.error(error.message);
    //                     rej(error);
    //                 }
    //             })
    //         )
    //     }
    // }



    function eliminarProducto(id) {
        return new Promise((res, rej) => {
            dispararAlertaConConfirmacion('¿Estás seguro de eliminar?', 'Esta acción no se puede deshacer','warning', 'Eliminar', 'Cancelar')
                .then(async (resultado) => {
                    if (resultado.isConfirmed) {
                        try {
                            const respuesta = await fetch(`https://682e9336746f8ca4a47d86df.mockapi.io/Productos/${id}`, {
                                method: 'DELETE',
                            });
                            if (!respuesta.ok) throw new Error('Error al eliminar');
                            dispararAlerta('Producto Eliminado', 'Producto eliminado correctamente.', 'success','Ok');
                            res();
                        } catch (error) {
                            console.error(error.message);
                            rej(error);
                        }
                    } else {
                        rej('Cancelado por el usuario'); // Si el usuario cancela
                    }
                });
        });
    }




    function buscarProductos(nombreProducto) {
        if (nombreProducto.length === 0) {
            setProductos(productosSinFiltrar);
            return productosSinFiltrar;
        }

        const productosFiltrados = productosSinFiltrar.filter((producto) =>
            producto.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
        );//--> filtra todos los productos que su nombre contenga "nombreProducto"

        setProductos(productosFiltrados);
        return productosFiltrados;
    }


    return (

        < ProductosContext.Provider value={{ obtenerProductos, buscarProductos, productos, agregarProducto, obtenerProducto, productoEncontrado, editarProducto, eliminarProducto }}>
            {children}
        </ProductosContext.Provider >
    );
}
export const useProductosContext = () => useContext(ProductosContext);