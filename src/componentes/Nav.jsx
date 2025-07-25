import { Link, NavLink } from 'react-router-dom';
import "../estilos/Nav.css"
import { useCarritoContext } from '../contextos/CarritoContext';
import { useAuthContext } from '../contextos/AuthContext';
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";

function NavBoostrap() {
    const { productosCarrito } = useCarritoContext();
    const { usuario, admin } = useAuthContext();
    return (

        <Navbar className="mb-3" bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    E-commerce
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="nav-principal" />
                <Navbar.Collapse id="nav-principal">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/about">Sobre Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
                        {admin && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
                        {admin && <Nav.Link as={Link} to="/admin/agregarProductos">Agregar productos</Nav.Link>}
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/carrito">
                            <FiShoppingCart className="md:text-[28px] sm:text-[24px] text-[20px]"
 style={{ marginRight: "5px" }} />
                            {productosCarrito.length > 0 && (
                                <Badge pill bg="danger" text="light">{productosCarrito.length}</Badge>
                            )}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

            // <nav className='nav'>
            //     <ul className='nav-ul'>
            //         <li ><NavLink to="/" className={({ isActive }) => isActive ? "activo" : ""}>🏠Inicio</NavLink></li>
            //         <li><NavLink to="/productos" className={({ isActive }) => isActive ? "activo" : ""}>📦Productos</NavLink></li>
            //         {!admin ? <li><NavLink to="/carrito" className={({ isActive }) => isActive ? "activo" : ""}>🛒Carrito <span className='nav-carritoCantidad' >{
            //             productosCarrito.length > 0 ? productosCarrito.length : ""}
            //         </span></NavLink></li> : <></>}
            //         {admin ? <li><NavLink to="/admin/agregarProductos" className={({ isActive }) => isActive ? "activo" : ""}>Agregar Productos</NavLink></li> : <></>}

            //         <li><NavLink to="/contacto" className={({ isActive }) => isActive ? "activo" : ""}>📞Contacto</NavLink></li>
            //         <li><NavLink to="/about" className={({ isActive }) => isActive ? "activo" : ""}>📖Sobre Nosotros</NavLink></li>
            //         {admin ? <li><NavLink to="/admin" className={({ isActive }) => isActive ? "activo" : ""}>🛠️Admin</NavLink></li> : <></>}
            //         <li><NavLink to="/login" className={({ isActive }) => isActive ? "activo" : ""}>🔑Iniciar Sesión</NavLink></li>
            //     </ul>
            // </nav> 

        
           
    );
}

export default NavBoostrap;