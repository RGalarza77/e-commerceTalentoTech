import { useEffect, useState } from "react";
import { useProductosContext } from "../contextos/ProductosContext";
import { Container, Carousel } from "react-bootstrap";


export default function Carrusel({ }) {
    const { productos, obtenerProductos } = useProductosContext();
    const [cargando, setCargando] = useState(true);

    const primerosProductos = productos.slice(0, 3); /*primeros 3 productos*/

    useEffect(() => {
        if (productos.length === 0) {
            obtenerProductos().then(() => setCargando(false));
        } else {
            setCargando(false);
        }
    }, []);

    if (cargando) return <p>Cargando Carrusel...</p>;
    if (primerosProductos.length === 0) return <p>No hay productos para mostrar</p>

    return (
        <Container className="my-4">
            <Carousel data-bs-theme="dark">
                {primerosProductos.map((producto) => (
                    <Carousel.Item key={producto.id}>
                        <img
                            className="d-block w-100"
                            src={producto.imagen}
                            alt={producto.nombre}
                            style={{ height: "400px", objectFit: "cover" }}
                        />
                        <Carousel.Caption>
                            <h5 style={{color:"white"}}>{producto.nombre}</h5>
                            <p style={{color:"white"}}s>{producto.descripcion}</p>
                        </Carousel.Caption>

                    </Carousel.Item>
                ))}
            </Carousel>


        </Container>

    );
}