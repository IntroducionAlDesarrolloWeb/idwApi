import logoCompleto from './assets/img/logo_completo.png'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Nosotros from './components/Nosotros';
import AddAlojamiento from './components/AddAlojamiento';
import AddTipoAlojamiento from './components/AddTipoAlojamiento';
import Busqueda from './components/Busqueda';
import Admin from './components/Admin';
import AddServicio from './components/AddServicio';
import AddAlojamientoServicios from './components/AddAlojamientoServicios';
import AddImagen from './components/AddImagen';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar/>
        <div style={{flex:1}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/busqueda" element={<Busqueda />} />
            <Route path="/admin" element={<Admin />} />
            <Route path = "/addTipoAlojamiento" element = {<AddTipoAlojamiento />} />
            <Route path = "/addAlojamiento" element = {<AddAlojamiento />} />
            <Route path = "/addServicio" element = {<AddServicio />} />
            <Route path = "/addAlojamientoServicio" element = {<AddAlojamientoServicios />} />
            <Route path = "/addImagen" element = {<AddImagen />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
