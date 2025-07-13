import { createContext, useContext, useState } from "react";


const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [productosCarrito, setProductosCarrito] = useState([]);

    /*Funcion que se pasa a Carrito para agregar productos*/
    const agregarAlCarrito = (producto) => {
        const existe = productosCarrito.find(p => p.id === producto.id);
        if (existe) {
            const carritoActualizado = productosCarrito.map((p) => {
                if (p.id === producto.id) {
                    var cantidad = p.cantidad + producto.cantidad;
                    const productoActualizado = { ...p, cantidad: p.cantidad + producto.cantidad };
                    return productoActualizado;
                } else {
                    return p;
                }
            })
            setProductosCarrito(carritoActualizado);
        } else { // Si no existe, lo agregamos con su cantidad     
            const auxCarrito = [...productosCarrito, producto]; /*...descompone cada elemento del array y agrega 'producto' al final*/
            setProductosCarrito(auxCarrito);
            // console.log(productosCarrito)
        }

    };

    const vaciarCarrito = () => {
        setProductosCarrito([]);
    };

    const borrarProductoCarrito = (id) => {
        const carritoActualizado = productosCarrito.filter((p) => p.id !== id);
        setProductosCarrito(carritoActualizado);
    };


    return (
        <CarritoContext.Provider value={{ productosCarrito, agregarAlCarrito, vaciarCarrito, borrarProductoCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
}

export const useCarritoContext = () => useContext(CarritoContext);




