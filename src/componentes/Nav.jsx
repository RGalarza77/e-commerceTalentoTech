import { Link, NavLink } from 'react-router-dom';
import "../estilos/Nav.css"
import { useCarritoContext } from '../contextos/CarritoContext';
import { useAuthContext } from '../contextos/AuthContext';


function Nav() {
    const {productosCarrito} = useCarritoContext();
    const {usuario} = useAuthContext(); 
    return (
        <nav className='nav'>
            <ul className='nav-ul'>
                <li ><NavLink to="/" className={({isActive})=> isActive ? "activo":""}>🏠Inicio</NavLink></li>
                <li><NavLink to="/productos" className={({isActive})=> isActive ? "activo":""}>📦Productos</NavLink></li>
                <li><NavLink to="/carrito" className={({isActive})=> isActive ? "activo":""}>🛒Carrito <span className='nav-carritoCantidad' >{
                    productosCarrito.length > 0 ? productosCarrito.length :""}
                </span></NavLink></li>
                {usuario ? <li><NavLink to="/admin/agregarProductos" className={({isActive})=> isActive ? "activo":""}>Agregar Productos</NavLink></li>: <></>}
                <li><NavLink to="/contacto" className={({isActive})=> isActive ? "activo":""}>📞Contacto</NavLink></li>
                <li><NavLink to="/about" className={({isActive})=> isActive ? "activo":""}>📖Sobre Nosotros</NavLink></li>
                {usuario ? <li><NavLink to="/admin" className={({isActive})=> isActive ? "activo":""}>🛠️Admin</NavLink></li> : <></>}
                <li><NavLink to="/login" className={({isActive})=> isActive ? "activo":""}>🔑Iniciar Sesión</NavLink></li>
            </ul>
        </nav>
    );
}

export default Nav;