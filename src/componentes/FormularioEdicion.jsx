import { useEffect, useState } from "react";
import { useProductosContext } from "../contextos/ProductosContext";
import { useParams } from "react-router-dom";


export default function FormularioEdicion({ }) {
    const { obtenerProducto, productoEncontrado } = useProductosContext();
    const { id } = useParams();
    const [producto, setProducto] = useState(productoEncontrado);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        obtenerProducto(id).then(() => {
            setCargando(false);
        }).catch((error) => {
            if (error == "Producto no encontrado") setError("Producto no encontrado");
            if (error == "Hubo un error al obtener el producto") setError("Hubo un error al obtener el producto");
            setCargando(false);
        })
    }, [id]); //[id] permite que el useEffect se ejecute cada vez que cambia un id

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch(`https://mockapi.io/api/v1/productos/${producto.id}`, {
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
            onActualizar(data);
            alert('Producto actualizado correctamente.');
        } catch (error) {
            console.error(error.message);
            alert('Hubo un problema al actualizar el producto.');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
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
        </form>
    );
}