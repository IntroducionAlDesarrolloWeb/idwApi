import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

const AddImagen = () => {
    const [alojamientos, setAlojamientos] = useState([]);
    const [idAlojamiento, setIdAlojamiento] = useState("");
    const [ruta, setRuta] = useState("");
    const [imagen, setImagen] = useState("");
    const [formData, setFormData] = useState({idAlojamiento: '', RutaArchivo: ''})
    useEffect(() => {
        const getAlojamientos = async () => {
            try{
                const response = await fetch("http://localhost:3001/alojamiento/getAlojamientos", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json", 
                    },
                });
    
                if(response.ok){
                    const data = await response.json()
                    setAlojamientos(data)
                }else{
                    alert("Error al crear el tipo de alojamiento.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error no se pudo establecer el servicio.");
            }
        }
        getAlojamientos()
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        formData.RutaArchivo = file
        console.log(file)
        // setImagen(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // formData.append('imagen', archivoImagen);
        try {
            const response = await fetch('http://localhost:3001/imagen/createImagen', {
              method: 'POST',
              body: formData,
            });
            const data = await response.json();
            console.log(data); // Puedes manejar la respuesta del servidor aquí
            alert('Imagen subida correctamente');
          } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Error al subir la imagen');
          }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    return(
        <div className="AddTipoAlojamientoForm">
            <h1 className="my-5">Agregar imagen</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="alojamiento" className='mt-2'>
                    <Form.Label>
                        Alojamiento
                    </Form.Label>
                    <Form.Select name="idAlojamiento"
                        value={formData.idAlojamiento}
                        onChange={handleChange}
                        className="form-select"
                        style={{
                            padding: '0.375rem 2rem 0.375rem 0.75rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            color: '#495057',
                            backgroundColor: '#fff',
                            backgroundImage: 'none',
                            border: '1px solid #ced4da',
                            borderRadius: '0.25rem',
                            appearance: 'none',
                            backgroundClip: 'padding-box',
                            boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
                            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                            width:'100%'
                            }}
                        >
                        <option disabled value=''>Seleccionar...</option>
                        { alojamientos.map((alojamiento) => (
                            <option value={alojamiento.idAlojamiento} key={alojamiento.idAlojamiento}>{alojamiento.Titulo}</option>
                        ))
                        }
                    </Form.Select>
                    <div style={{color:'#1A84CB', fontSize:'12px'}}>
                        Si no encuentra el alojamiento, puede crear uno
                        <a style={{textDecoration:'underline', marginLeft:'5px', color:'#1A84CB'}} href="/addAlojamiento">AQUI</a>
                    </div>
                </Form.Group>
                <Form.Group controlId="imagen" className="mb-3">
                    {/* <Form.Label>Selecciona una imagen</Form.Label> */}
                    <Form.Control
                    type="file"
                    // accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                    style={{border:'none', marginTop:'10px'}}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Subir Imagen
                </Button>
            </Form>
        </div>
    )
};

export default AddImagen;