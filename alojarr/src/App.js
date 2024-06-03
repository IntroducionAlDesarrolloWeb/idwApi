import React from "react";
import {BrowserRouter as  Router, Route, Routes, Link} from "react-router-dom";
import './App.css';

import logo from "./imagenes/logo.png";
import x from "./imagenes/x.png";
import telefono from "./imagenes/telefono.png";
import persona from "./imagenes/persona.png";
import logo_completo from "./imagenes/logo_completo.png";
import instagram from "./imagenes/instagram.png";
import hotel from "./imagenes/hotel.png";
import facebook from "./imagenes/facebook.png";
import correo from "./imagenes/correo.png";
import css from "./style.css";
import AddTipoAlojamiento from "./AddTipoAlojamiento";
import AddAlojamiento from "./AddAlojamiento";




function Home(){
  return(
<body>    
 
    <main>
      <section className="info">
        <div className="info">
          <h2>Sentite como en casa en cualquier parte del mundo</h2>
          <h4>Encontrá tu alojamiento al mejor precio.</h4>
        </div>
      </section>

      <section className="contenedor">
        <div className="img">
          <img
            src="https://cf.bstatic.com/xdata/images/hotel/max500/511545115.jpg?k=422b9400a302d6a16cec9d2c15bcb4497c943fb58e8eefce47a32cd834467670&o="
            alt="hoteles"
            className="img-normalizada"
          />
          <h2>Hoteles</h2>
          <button>Buscar!</button>
        </div>

        <div className="img">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/f6/76/db/cabanas-cumelen.jpg?w=700&h=-1&s=1"
            alt="cabañas"
            className="img-normalizada"
          />
          <h2>Cabañas</h2>
          <button>Buscar!</button>
        </div>

        <div className="img">
          <img
            src="https://casa-web.com.ar/wp-content/uploads/2013/09/decoracion-tonos-claros-para-departamento-chico.jpg"
            alt="departamentos"
            className="img-normalizada"
          />
          <h2>Departamentos</h2>
          <button>Buscar!</button>
        </div>

        <div className="img">
          <img
            src="https://domosgeodesicos.files.wordpress.com/2021/07/img_5365-edited.jpg?w=1024"
            alt="domos"
            className="img-normalizada"
          />
          <h2>Domos</h2>
          <button>Buscar!</button>
        </div>
      </section>
    </main>
    </body>
  )
}

function Nosotros(){return(
  <body>
    <h1>Sobre nosotros...</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu tincidunt libero, vitae laoreet nibh. Pellentesque non fermentum est. Aliquam ultricies facilisis ante eu consequat. Nunc convallis nulla vitae augue mattis efficitur. Vivamus at malesuada diam. Quisque convallis magna vel lectus rhoncus auctor. Cras sed ante nec nulla rutrum varius.Nulla aliquet convallis bibendum. Morbi tristique scelerisque tempus. Fusce convallis nisi id risus aliquam, sed vulputate velit fermentum. Sed sit amet nisl a nulla volutpat rutrum id vitae arcu. Morbi aliquet posuere fermentum. Proin vel fermentum urna. Aenean a dolor ipsum. In a est tellus. Etiam eleifend diam vitae enim rutrum aliquet. Nullam id quam quis diam vehicula mollis. Donec viverra metus nec augue aliquam tristique. Suspendisse sed ligula malesuada mi porttitor dictum. Cras eros quam, tempus nec elementum nec, tristique congue mi. Fusce iaculis ex id odio feugiat, nec egestas diam mattis. Pellentesque hendrerit nulla vel vehicula lobortis.</p>
    
    <h1>Nuestro equipo</h1>
    <section class="contenedor">
        <div class="empleado">
            <img src={persona} alt="empleado" height="100"/>
            <p>Nombre: Juanito Perez</p>
            <p>Puesto: </p>
        </div>
        <div>
            <img src={persona} alt="empleado" height="100"/>
            <p>Nombre: Juanito Perez</p>
            <p>Puesto: </p>
        </div>
        <div>
            <img src={persona} alt="empleado" height="100"/>
            <p>Nombre: Juanito Perez</p>
            <p>Puesto: </p>
        </div>
    </section>
</body>
)}

function Contacto(){return(
  <body>
    <section class="contacto">
        <div class="contacto">
            <h1> ¡Contactanos!</h1>
            <h3>Seguinos en nuestras diferentes redes sociales para recibir las ultimas novedades.</h3>
            <ul>
                <li>
                    <a href="tel:+54111111111111">
                        <img src={telefono} alt="telefono" height="20" class="socialIcon"/>
                    </a> Telefono: +54 11 111 1111111
                </li>
                <li>
                    <a href="mailto:contacto@alojar.com">
                        <img src={correo} alt="correo" height="20" class="socialIcon"/>
                    </a> Correo electronico: contacto@alojar.com
                </li>
                <li>
                    <a href="https://www.instagram.com/alojar">
                        <img src={instagram} alt="instagram" height="20" class="socialIcon"/>
                    </a> Instagram: @alojar
                </li>
                <li>
                    <a href="https://twitter.com/alojar">
                        <img src={x} alt="x" height="20" class="socialIcon"/>
                    </a>Twitter: @alojar 
                </li>
                <li>
                    <a href="https://www.facebook.com/alojar">
                        <img src= {facebook} alt="facebook" height="20" class="socialIcon"/>
                    </a> Facebook: @alojar 
                </li>
            </ul>
        </div>
    </section>
</body>
)}

function App() {
  return (
    <Router>
    <div className="App">
    <header>
        <div class="logo">
            <a href="/">
                <img src={logo_completo} alt="alojAR logo" height="40"/>
            </a> 
        </div>
        <nav class="navbar">
            <ul>
                <li class="listItem"><Link to ="/">Home</Link></li>
                <li class="listItem"><Link to ="/alojamientos">Alojamientos</Link></li>
                <li class="listItem"><Link to ="/nosotros">Nosotros</Link></li>
                <li class="listItem"><Link to ="/contacto">Contacto</Link></li>
                <li class="listItem"><Link to ="/tipoAlojamiento">Tipo alojamiento</Link></li>
                <li class="listItem"><Link to ="/alojamiento">Alojamiento</Link></li>
            </ul>
        </nav>
    </header>
      <main>
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/alojamientos" element = {<Home />} />
          <Route path = "/nosotros" element = {<Nosotros />} />
          <Route path = "/contacto" element = {<Contacto />} />
          <Route path = "/tipoAlojamiento" element = {<AddTipoAlojamiento />} />
          <Route path = "/alojamiento" element = {<AddAlojamiento />} />
        </Routes>
      </main>
      <footer>
        <p>&copy; Alojar 2024. Todos los derechos resevados.</p>
    </footer>
    </div>
    </Router>
  );
}

export default App;
