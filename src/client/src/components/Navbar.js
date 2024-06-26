import React from 'react'
import logoCompleto from '../assets/img/logo_completo.png'
import { Link } from 'react-router-dom'
import '../App.css'

const Navbar = () => {
  return (
    <header>
        <div className="logo">
            <a href="">
                <img src={logoCompleto} alt="alojAR logo" height="40"/>
            </a> 
        </div>
        <nav className="navbar">
            <ul>
                <li className="listItem"><Link to="/">Home</Link></li>
                <li className="listItem"><Link to="/nosotros">Nosotros</Link></li>
                <li className="listItem"><Link to="/contacto">Contacto</Link></li>
                <li className="listItem adminBtn"><Link to="/admin">Administrar</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar