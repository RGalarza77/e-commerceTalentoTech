import { useEffect, useState } from "react";
import { useProductosContext } from "../contextos/ProductosContext";
import { Navigate, useParams } from "react-router-dom";
import { dispararAlerta } from "../assets/SweetAlet";
import { useAuthContext } from "../contextos/AuthContext";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function FormularioEdicion({ }) {
    const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
    const { id } = useParams();
    const { admin } = useAuthContext();
    const [producto, setProducto] = useState(productoEncontrado);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    /*Proteccion para que solo admin ingrese a este formulario*/
    if (!admin) {
        return (
            <Navigate to='/login' replace></Navigate>
        );
    }

    useEffect(() => {
        obtenerProducto(id).then(() => {
            setCargando(false);
        }).catch((error) => {
            if (error == "Producto no encontrado") setError("Producto no encontrado");
            if (error == "Hubo un error al obtener el producto") setError("Hubo un error al obtener el producto");
            setCargando(false);
        })
    }, [id]); //[id] permite que el useEffect se ejecute cada vez que cambia un id


    /*Validaciones*/
    const validarFormulario = () => {

        if (!producto.nombre.trim()) {
            return ('El nombre es obligatorio.');
        }
        if (!producto.precio || producto.precio <= 0) {
            return ('El precio debe ser mayor a 0.');
        }
        if (!producto.descripcion.trim() || producto.descripcion.length < 10) {
            return ('La descripción debe tener al menos 10 caracteres.');
        }
        if (!producto.imagen.trim()) {
            return ('La URL de la imagen no debe estas vacia');
        } else {
            return true;
        }
    };

    /*Funciones*/

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validarFormulario() == true) {
            editarProducto(producto).then((prod) => {   
                toast.success("Producto editado correctamente!");
            }).catch((error) => {
                dispararAlerta('Error Actualizacion Producto', 'Hubo un problema al actualizar el producto.', 'error', 'Ok');
            })
        } else {
            dispararAlerta('Error al agregar el producto', validarFormulario(), "error", "Cerrar");
        }

    };
    return (

        <form onSubmit={handleSubmit}>
            {/* Helmet ayuda a posicionar mejor la pag para el CEO, permitiendo poner mas <meta> y <title>*/}
            <Helmet>
                <title>Editar Productos | E-commerce</title>
                <meta name="description" content="Edicion de nuestros productos." />
            </Helmet>
            <h2>Editar Producto</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    name="nombre"
                    value={producto.nombre || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Imagen:</label>
                <input
                    type="text" name="imagen" value={producto.imagen} onChange={handleChange} required />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    name="precio"
                    value={producto.precio || ''}
                    onChange={handleChange}
                    required
                    min="0"
                />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea
                    name="descripcion"
                    value={producto.descripcion || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Actualizar Producto</button>
            <ToastContainer/>
        </form>
    );
}