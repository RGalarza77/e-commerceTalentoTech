import { Link, NavLink } from 'react-router-dom';
import "../estilos/Nav.css"
import { useCarritoContext } from '../contextos/CarritoContext';
import { useAuthContext } from '../contextos/AuthContext';
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineAdjustments } from "react-icons/hi";
import { HiOutlineCube } from "react-icons/hi";

function NavBoostrap() {
    const { productosCarrito } = useCarritoContext();
    const { usuario, admin } = useAuthContext();
    return (

        <Navbar className="mb-3"  expand="lg" sticky="top" style={{ backgroundColor:  '#1df90022' }}data-bs-theme="light">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <p class="fs-3">E-Commerce</p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="nav-principal" />
                <Navbar.Collapse id="nav-principal">
                    <Nav className="me-auto">
                        
                        <Nav.Link as={Link} to="/"><p className="fs-4"><HiOutlineHome style={{ fontSize: '1.5rem' }}/> Inicio</p></Nav.Link>
                        <Nav.Link as={Link} to="/productos"><p className="fs-4"><HiOutlineCube style={{ fontSize: '1.5rem' }}/> Productos</p></Nav.Link>
                        {/* <Nav.Link as={Link} to="/about">Sobre Nosotros</Nav.Link> */}
                        {/* <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link> */}
                        {admin && <Nav.Link as={Link} to="/admin"><p className="fs-4"><HiOutlineAdjustments style={{ fontSize: '1.5rem' }}/> Admin</p></Nav.Link>}
                        {/* {admin && <Nav.Link as={Link} to="/admin/agregarProductos">Agregar productos</Nav.Link>} */}
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/carrito">
                            <FiShoppingCart style={{ marginRight: "5px", fontSize: '2rem' }} />
                            {productosCarrito.length > 0 && (
                                <Badge pill bg="danger" text="light">{productosCarrito.length}</Badge>
                            )}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login"> <VscAccount style={{fontSize: '2rem'}}/> </Nav.Link>
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