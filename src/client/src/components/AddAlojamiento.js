import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

 const AddAlojamiento = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const getTipos = async () => {
            try{
                const response = await fetch("http://localhost:3001/tiposAlojamiento/getTiposAlojamiento", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json", 
                    },
                });
    
                if(response.ok){
                    const data = await response.json()
                    setTiposAlojamiento(data)
                }else{
                    alert("Error al crear el tipo de alojamiento.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error no se pudo establecer el servicio.");
            }
        }
        getTipos()
    }, [])
    
    const clearForm = {
        Titulo: '',
        Descripcion: '',
        TipoAlojamiento: '',
        Latitud: '',
        Longitud: '',
        PrecioPorDia: '',
        CantidadDormitorios: '',
        CantidadBanios: '',
        Estado: '',
    }

    const [formData, setFormData] = useState(clearForm);
    const [tiposAlojamiento, setTiposAlojamiento] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleRadioChange = (e) => {
        setFormData({
            ...formData,
            Estado: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.Latitud = parseFloat(formData.Latitud)
        formData.Longitud = parseFloat(formData.Longitud)
        formData.PrecioPorDia = parseFloat(formData.PrecioPorDia)
        formData.CantidadDormitorios = parseInt(formData.CantidadDormitorios, 10)
        formData.CantidadBanios = parseInt(formData.CantidadBanios, 10)

        try{
            const response = await fetch("http://localhost:3001/Alojamiento/createAlojamiento", {
                method: "POST",
                headers: {
                    "Content-type": "application/json", 
                },
                body: JSON.stringify(formData)
            });
            if(response.ok){
                alert("Se creo correctamente el alojamiento.");
                navigate('/admin')
            }else{
                alert("Error al crear el alojamiento.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error no se pudo establecer el servicio.");
        }
        
        setFormData(clearForm);
    };

    return(
        <Container className="mt-5 mx-auto" style={{width:'450px'}}>
            <Row>
                <Col>
                <h1>Alta de alojamiento</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="Titulo" className='mt-2'>
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                        type="text"
                        name="Titulo"
                        placeholder="Ej: Hotel Golondrina"
                        value={formData.Titulo}
                        required
                        onChange={handleChange}
                    />
                    </Form.Group>
                    <Form.Group controlId="Descripcion" className='mt-2'>
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            type="text"
                            name="Descripcion"
                            placeholder="Describa su alojamiento..."
                            value={formData.Descripcion}
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="TipoAlojamiento" className='mt-2'>
                        <Form.Label>
                            Tipo de Alojamiento
                        </Form.Label>
                        <Form.Select name="TipoAlojamiento"
                            value={formData.TipoAlojamiento}
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
                            { tiposAlojamiento.map((tipo) => (
                                <option value={tipo.idTipoAlojamiento} key={tipo.idTipoAlojamiento}>{tipo.Descripcion}</option>
                            ))

                            }
                        </Form.Select>
                        <div style={{color:'#1A84CB', fontSize:'12px'}}>
                            Si no encuentra el tipo de alojamiento, puede crear uno
                            <a style={{textDecoration:'underline', marginLeft:'5px', color:'#1A84CB'}} href="/addTipoAlojamiento">AQUI</a>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="Latitud" className='mt-2'>
                        <Form.Label>Latitud</Form.Label>
                        <Form.Control
                            type="text"
                            name="Latitud"
                            placeholder="34° 36' 11,81″ S."
                            value={formData.Latitud}
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Longitud" className='mt-2'>
                        <Form.Label>Longitud</Form.Label>
                        <Form.Control
                            type="text"
                            name="Longitud"
                            placeholder="58° 22' 51,42″ W."
                            value={formData.Longitud}
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="PrecioPorDia" className='mt-2'>
                        <Form.Label>Precio por dia</Form.Label>
                        <Form.Control
                            type="text"
                            name="PrecioPorDia"
                            placeholder="Ej: 300"
                            value={formData.PrecioPorDia}
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="CantidadDormitorios" className='mt-2'>
                        <Form.Label>Cantidad de dormitorios</Form.Label>
                        <Form.Control
                            type="number"
                            name="CantidadDormitorios"
                            placeholder="Ej: 1"
                            value={formData.CantidadDormitorios}
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="banios" className='mt-2'>
                        <Form.Label>Cantidad de baños</Form.Label>
                        <Form.Control
                            type="number"
                            name="CantidadBanios"
                            placeholder="0"
                            value={formData.CantidadBanios}
                            required
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Estado" className='mt-2'>
                        <Form.Label>Estado</Form.Label>
                        <div key='radio' className="mb-3">
                            <Form.Check
                                inline
                                label="Disponible"
                                // name="group1"
                                type="radio"
                                id='disponible'
                                value="Disponible"
                                checked={formData.Estado === 'Disponible'}
                                onChange={handleRadioChange}
                            />
                            <Form.Check
                                inline
                                label="Reservado"
                                type="radio"
                                id='reservado'
                                value="Reservado"
                                checked={formData.Estado === 'Reservado'}
                                onChange={handleRadioChange}
                            />
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="submitBtn">
                        ENVIAR
                    </Button>
                </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default AddAlojamiento;