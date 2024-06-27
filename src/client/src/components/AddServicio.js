import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

 const AddServicio = () => {
    const [nombre, setNombre] = useState("");
    const [servicios, setServicios] = useState([])
    const [showTable, setShowTable] = useState(false)
    const [serviceToEdit, setServiceToEdit] = useState({})
    const [showEditModal, setShowEditModal] = useState(false);

    const handleClose = () => setShowEditModal(false);
    const handleShow = () => setShowEditModal(true);
    
    const crearServicio = async (e) => {
        e.preventDefault();
        const json = {
            Nombre: nombre,
        };
        console.log(json)
        try{
            const respose = await fetch("http://localhost:3001/servicio/createServicio", {
                method: "POST",
                headers: {
                    "Content-type": "application/json", 
                },
                body: JSON.stringify(json)
            });
            if(respose.ok){
                alert("Se creo correctamente el servicio.");
                window.location.reload();
            }else{
                alert("Error al crear el servicio.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error no se pudo establecer el servicio.");
        }
    }

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

    const editarServicio = async (id) => {
        const json = {
            Nombre: nombre
        };
        try{
            const response = await fetch(`http://localhost:3001/servicio/updateServicio/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json", 
                },
                body: JSON.stringify(json)
            });
            if(response.ok){
                alert("Se edito correctamente el servicio.");
                window.location.reload();
            }else{
                alert("Error al editar el servicio.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error no se pudo establecer el servicio.");
        }
        handleClose()
    }

    const eliminarServicio = async (id) => {
        try{
            const response = await fetch(`http://localhost:3001/servicio/deleteServicio/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json", 
                },
            });
            if(response.ok){
                alert("Se elimino correctamente el servicio");
                window.location.reload();
            }else{
                alert("Error al eliminar el servicio.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error no se pudo establecer el servicio.");
        }
    }

    return(
        <div className="AddServicioForm">
            <h1 className="my-5">Agregar servicio</h1>
            <form onSubmit={crearServicio} style={{minWidth:'310px'}}>
                <div className="mb-3">
                    <label htmlFor="Nombre" className="mr-2">Nombre</label>
                    <input type="text" id="Nombre" value={nombre}
                    onChange={(e) => setNombre(e.target.value)} className="form-control"/>
                </div>
                <button type="submit" className="submitBtn">Enviar</button>
                <button type="button" onClick={()=>mostrarServicios()} className='btn btn-secondary mt-3' style={{width:'100%'}}>{showTable ? 'Ocultar servicios' : 'Ver servicios'}</button>
            </form>
            {showTable && !servicios.length ? 
                <p className="text-danger m-3">No hay servicios cargados</p>
            :
                <table className="table table-bordered my-4" style={{display: showTable ? 'inline' : 'none', width: '300px'}}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" width='50px'>Id</th>
                            <th scope="col" width='180px'>Nombre</th>
                            <th scope="col" width='70px'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios.map((servicio) => (
                            <tr key={servicio.idServicio} >
                                <th scope="row">{servicio.idServicio}</th>
                                <td>{servicio.Nombre}</td>
                                <td>
                                    <button type='button' onClick={() => eliminarServicio(servicio.idServicio)} className="btn btn-light p-0 mr-2" ><FaTrashAlt/></button>
                                    <button type='button' className="btn btn-light p-0 " onClick={() => { handleShow(); setServiceToEdit(servicio)}}>
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
                <Modal.Title>Editar Servicio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="nombre" className="mr-2"><b>Valor actual:</b> "{serviceToEdit.Nombre}"</label>
                    <input type="text" id="nombre" value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    className="form-control" placeholder={'Nombre'}/>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={() => editarServicio(serviceToEdit.idServicio)}>
                    Guardar
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default AddServicio;