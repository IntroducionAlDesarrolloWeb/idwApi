import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";

const AddAlojamientoServicios = () => {
    const clearForm = {
        idAlojamiento: '',
        idServicio: ''
    }
    const [alojamientoServicios, setAlojamientoServicios] = useState([])
    const [showTable, setShowTable] = useState(false)
    const [alojamientoServicioToEdit, setAlojamientoServicioToEdit] = useState({})
    const [showEditModal, setShowEditModal] = useState(false);
    const [ alojamientos, setAlojamientos ] = useState([])
    const [ servicios, setServicios ] = useState([])
    const [formData, setFormData] = useState(clearForm);

    const handleClose = () => setShowEditModal(false);
    const handleShow = () => setShowEditModal(true);

    const vincularServicio = async (e) => {
        e.preventDefault();
        try{
            const respose = await fetch("http://localhost:3001/alojamientosServicios/createAlojamientoServicio", {
                method: "POST",
                headers: {
                    "Content-type": "application/json", 
                },
                body: JSON.stringify(formData)
            });
            if(respose.ok){
                alert("Se asigno correctamente el servicio al alojamiento.");
                window.location.reload();
            }else{
                alert("Error al asignar el servicio al alojamiento.");
            }
            setFormData(clearForm)
        } catch (error) {
            console.error("Error:", error);
            alert("Error no se pudo establecer el servicio.");
        }
    }
    
    const mostrarAlojamientoServicios = async () => {
        setShowTable(prevShowTable => !prevShowTable)
        try{
            const response = await fetch("http://localhost:3001/alojamientosServicios/getAllAlojamientoServicios", {
                method: "GET",
                headers: {
                    "Content-type": "application/json", 
                },
            });

            if(response.ok){
                const data = await response.json()
                setAlojamientoServicios(data)
            } else{
                alert("Error cargar");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error no se pudo establecer el servicio.");
        }
    }

    const editarAlojamientoServicio = async (id) => {
        try{
            const response = await fetch(`http://localhost:3001/alojamientosServicios/updateAlojamientoServicio/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json", 
                },
                body: JSON.stringify(formData)
            });
            if(response.ok){
                alert("Se edito correctamente.");
                window.location.reload();
            }else{
                alert("Error al editar.");
            }
            setFormData(clearForm)
        } catch (error) {
            console.error("Error:", error);
            alert("Error no se pudo establecer el servicio.");
        }
        handleClose()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };
    
    useEffect(() => {
        const mostrarServicios = async () => {
            setShowTable(prevShowTable => !prevShowTable)
            try{
                const response = await fetch("http://localhost:3001/servicio/getAllServicios", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json", 
                    },
                });
    
                if(response.ok){
                    const data = await response.json()
                    setServicios(data)
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error no se pudo establecer el servicio.");
            }
        }
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
        mostrarServicios()
        getAlojamientos()
    }, [])
    
    const eliminarAlojamientoServicio = async (id) => {
        try{
            const response = await fetch(`http://localhost:3001/alojamientosServicios/deleteAlojamientoServicio/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json", 
                },
            });
            if(response.ok){
                alert("Se elimino correctamente.");
                window.location.reload();
            }else{
                alert("Error al eliminar.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error no se pudo establecer el servicio.");
        }
    }

    const getTituloAlojamiento = (idAlojamiento) => {
        const alojamiento = alojamientos.find((aloj) => aloj.idAlojamiento === idAlojamiento);
        return alojamiento ? alojamiento.Titulo : 'Desconocido';
    };

    const getTituloServicio = (idServicio) => {
        const servicio = servicios.find((serv) => serv.idServicio === idServicio);
        return servicio ? servicio.Nombre : 'Desconocido';
    };
    
    return(
        <div className="AddAlojamientoServicioForm">
            <h1 className="my-5">Servicio de alojamiento</h1>
            <Form onSubmit={vincularServicio}>
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
                <Form.Group controlId="servicio" className='mt-2'>
                    <Form.Label>
                        Servicio
                    </Form.Label>
                    <Form.Select name="idServicio"
                        value={formData.idServicio}
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
                        { servicios.map((servicio) => (
                            <option value={servicio.idServicio} key={servicio.idServicio}>{servicio.Nombre}</option>
                        ))

                        }
                    </Form.Select>
                    <div style={{color:'#1A84CB', fontSize:'12px'}}>
                        Si no encuentra el servicio, puede crear uno
                        <a style={{textDecoration:'underline', marginLeft:'5px', color:'#1A84CB'}} href="/addServicio">AQUI</a>
                    </div>
                </Form.Group>
                <Button variant="primary" type="submit" className="submitBtn">
                    VINCULAR
                </Button>
                <button type="button" onClick={()=>mostrarAlojamientoServicios()} className='btn btn-secondary mt-3' style={{width:'100%'}}>{showTable ? 'Ocultar servicios de alojamientos' : 'Ver servicios de alojamientos'}</button>

            </Form>
            
            {showTable && !alojamientoServicios.length ? 
                <p className="text-danger m-3">No hay servicios vinculados a los alojamientos</p>
            :
                <table className="table table-bordered my-4" style={{display: showTable ? 'inline' : 'none', width: '600px'}}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" width='50px'>Id</th>
                            <th scope="col" width='235px'>Alojamiento</th>
                            <th scope="col" width='235px'>Servicio</th>
                            <th scope="col" width='80px'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {alojamientoServicios.map((alojamientoServicio) => (
                            <tr key={alojamientoServicio.idAlojamientoServicio} >
                                <td scope="row">{alojamientoServicio.idAlojamientoServicio}</td>
                                <td scope="row">{getTituloAlojamiento(alojamientoServicio.idAlojamiento)}</td>
                                <td scope="row">{getTituloServicio(alojamientoServicio.idServicio)}</td>
                                <td>
                                    <button type='button' onClick={() => eliminarAlojamientoServicio(alojamientoServicio.idAlojamientoServicio)} className="btn btn-light p-0 mr-2" ><FaTrashAlt/></button>
                                    <button type='button' className="btn btn-light p-0 " onClick={() => { handleShow(); setAlojamientoServicioToEdit(alojamientoServicio)}}>
                                        <MdEdit/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
            
            <Modal show={showEditModal} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Editar relacion Alojamiento - Servicio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
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
                        <Form.Group controlId="servicio" className='mt-2'>
                            <Form.Label>
                                Servicio
                            </Form.Label>
                            <Form.Select name="idServicio"
                                value={formData.idServicio}
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
                                { servicios.map((servicio) => (
                                    <option value={servicio.idServicio} key={servicio.idServicio}>{servicio.Nombre}</option>
                                ))

                                }
                            </Form.Select>
                            <div style={{color:'#1A84CB', fontSize:'12px'}}>
                                Si no encuentra el servicio, puede crear uno
                                <a style={{textDecoration:'underline', marginLeft:'5px', color:'#1A84CB'}} href="/addServicio">AQUI</a>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={() => editarAlojamientoServicio(alojamientoServicioToEdit.idAlojamientoServicio)}>
                    Guardar
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
};

export default AddAlojamientoServicios;