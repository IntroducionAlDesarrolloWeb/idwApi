import React, { useState } from "react";

 const AddServicio = () => {
    const [nombre, setNombre] = useState("");

    const enviar = async (e) => {
    e.preventDefault();
    const json = {
    Nombre: nombre,
    };

            // conexion con api

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
                }else{
                    alert("Error al crear el servicio.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error no se pudo establecer el servicio.");
            }
    }

    return(
        <div>
            <h1>Alta servicio formulario</h1>
            <form onSubmit={enviar}>
                <div>
                    <label htmlFor="Nombre">Nombre</label>
                    <input type="text" id="Nombre" value={Nombre}
                    onChange={(e) => setNombre(e.target.value)}/>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
};

export default AddServicio;