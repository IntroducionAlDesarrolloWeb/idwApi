import React, { useState } from "react";

 const AddAlojamientoServicios = () => {
    const [idAlojamiento, setIdAlojamiento] = useState("");
    const [idServicio, setIdServicio] = useState("");


    const enviar = async (e) => {
    e.preventDefault();
    const json = {
    IdAlojamiento: idAlojamiento,
    IdServicio: idServicio,
    };

            // conexion con api

            try{
                const respose = await fetch("http://localhost:3001/alojamientosServicios/createAlojamientoServicio", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json", 
                    },
                    body: JSON.stringify(json)
                });
                if(respose.ok){
                    alert("Se asigno correctamente el servicio a el alojamiento.");
                }else{
                    alert("Error al asignar el servicio a el alojamiento.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error no se pudo establecer el servicio.");
            }
    }

    return(
        <div>
            <h1>Alta servicio de alojamiento formulario</h1>
            <form onSubmit={enviar}>
                <div>
                    <label htmlFor="idAlojamiento">idAlojamiento</label>
                    <input type="number" id="IdAlojamiento" value={idAlojamiento}
                    onChange={(e) => setIdAlojamiento(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="idServicio">IdServicio</label>
                    <input type="text" id="idServicio" value={idServicio}
                    onChange={(e) => setIdServicio(e.target.value)}/>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
};

export default AddAlojamientoServicios;