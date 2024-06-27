import React, { useState, useEffect } from 'react'
import { Container, Row, Form, Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Modal from 'react-bootstrap/Modal';

const Admin = () => {

    const navigate = useNavigate()
    const [ alojamientos, setAlojamientos ] = useState([])
    const [ toEdit, setToEdit ] = useState()
    const [ showEditModal, setShowEditModal ] = useState(false)
    const [formData, setFormData] = useState([]);
    const [tiposAlojamiento, setTiposAlojamiento] = useState([]);

    const handleClose = () => {
        setShowEditModal(false)
        setFormData([])
        setToEdit('')
    }
    const handleShow = () => setShowEditModal(true);
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
        const getTipos = async () => {
            // setShowTable(prevShowTable => !prevShowTable)
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
        getAlojamientos()
    }, [])
    
    const getDescripcionById = (id) => {
        const tipo = tiposAlojamiento.find(tipo => tipo.idTipoAlojamiento === id);
        return tipo ? tipo.Descripcion : "Desconocido";
      };

    const eliminarAlojamiento = async (idAlojamiento) => {
        try{
            const response = await fetch(`http://localhost:3001/alojamiento/deleteAlojamiento/${idAlojamiento}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json", 
                },
            });
            if(response.ok){
                alert("Se elimino correctamente el alojamiento.");
                window.location.reload();
            }else{
                alert("Error al eliminar el tipo de alojamiento.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error no se pudo establecer el servicio.");
        }
    }

    const editarAlojamiento = async (id) => {
        try{
            const response = await fetch(`http://localhost:3001/alojamiento/putAlojamiento/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json", 
                },
                body: JSON.stringify(formData)
            });
            if(response.ok){
                alert("Se edito correctamente el alojamiento.");
                window.location.reload();
            }else{
                alert("Error al editar el alojamiento.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error no se pudo establecer el servicio.");
        }
        handleClose()
    }
  return (
    <Container className="mt-5 mx-auto" style={{maxWidth:'90%'}}>
        <Row className='mb-4'>
            <button type="button" className='btn btn-primary mr-3' id="crearAlojamientoBtn" onClick={()=>navigate('/addAlojamiento')}>Crear alojamiento</button>
            <button type="button" className='btn btn-secondary mr-3' id="crearTipoBtn" onClick={()=>navigate('/addTipoAlojamiento')}>Crear tipo de alojamiento</button>
            <button type="button" className='btn btn-secondary mr-3' id="crearTipoBtn" onClick={()=>navigate('/addServicio')}>Crear Servicio</button>
            <button type="button" className='btn btn-secondary' id="crearTipoBtn" onClick={()=>navigate('/addAlojamientoServicio')}>Vincular Servicio a Alojamiento</button>
        </Row>
        <Row>
            <Table responsive striped bordered hover>
            <thead>
                <tr>
                    {/* Agregar key */}
                    <th>ID</th>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Tipo de Alojamiento</th>
                    <th>Latitud</th>
                    <th>Longitud</th>
                    <th>Precio por Dia</th>
                    <th>Dormitorios</th>
                    <th>Baños</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {alojamientos.map((alojamiento) => (
                    <tr key={alojamiento.idAlojamiento}>
                        <td>{alojamiento.idAlojamiento}</td>
                        <td>{alojamiento.Titulo}</td>
                        <td>{alojamiento.Descripcion}</td>
                        <td>{getDescripcionById(alojamiento.TipoAlojamiento)}</td>
                        <td>{alojamiento.Latitud}</td>
                        <td>{alojamiento.Longitud}</td>
                        <td>{alojamiento.PrecioPorDia}</td>
                        <td>{alojamiento.CantidadDormitorios}</td>
                        <td>{alojamiento.CantidadBanios}</td>
                        <td>{alojamiento.Estado}</td>
                        <td>
                            <button title='Eliminar' type='button' style={{backgroundColor:'transparent', border:'none'}} onClick={() => eliminarAlojamiento(alojamiento.idAlojamiento)} className="btn btn-light p-0 mr-2" ><FaTrashAlt/></button>
                            <button title='Editar' type='button' style={{backgroundColor:'transparent', border:'none'}} className="btn btn-light p-0 " onClick={() => { handleShow(); setToEdit(alojamiento)}}>
                                <MdEdit/>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
        </Row>
        { !toEdit ? null :
            <Modal show={showEditModal} onHide={()=> handleClose}>
                <Modal.Header>
                    <Modal.Title>Editar Alojamiento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="Titulo" className='mt-2'>
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control
                            type="text"
                            name="Titulo"
                            placeholder={toEdit.Titulo}
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
                                placeholder={toEdit.Descripcion}
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
                                <option disabled value=''>{getDescripcionById(toEdit.TipoAlojamiento)}</option>
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
                                placeholder={toEdit.Latitud}
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
                                placeholder={toEdit.Longitud}
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
                                placeholder={toEdit.PrecioPorDia}
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
                                placeholder={toEdit.CantidadDormitorios}
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
                                placeholder={toEdit.CantidadBanios}
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
                                    checked={formData.Estado === 'Disponible' || toEdit.Estado == 'Disponible'}
                                    onChange={handleRadioChange}
                                    selected={toEdit.Estado == 'Disponible'}
                                />
                                <Form.Check
                                    inline
                                    label="Reservado"
                                    type="radio"
                                    id='reservado'
                                    value="Reservado"
                                    checked={formData.Estado === 'Reservado' || toEdit.Estado == 'Reservado'}
                                    onChange={handleRadioChange}
                                    selected={toEdit.Estado == 'Reservado'}
                                />
                            </div>
                        </Form.Group>
                        {/* <Button variant="primary" type="submit" className="submitBtn">
                            ENVIAR
                        </Button> */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={() => editarAlojamiento(toEdit.idAlojamiento)}>
                    Guardar
                </Button>
                </Modal.Footer>
            </Modal>
        }

    </Container>
  )
}

export default Admin