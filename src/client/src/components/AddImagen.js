import React, { useState } from "react";

 const AddImagen = () => {
    const [idAlojamiento, setIdAlojamiento] = useState("");
    const [ruta, setRuta] = useState("");


    const enviar = async (e) => {
    e.preventDefault();
    const json = {
    IdAlojamiento: idAlojamiento,
    Ruta: ruta,
    };

            // conexion con api

            try{
                const respose = await fetch("http://localhost:3001/imagen/createImagen", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json", 
                    },
                    body: JSON.stringify(json)
                });
                if(respose.ok){
                    alert("Se creo correctamente la imagen.");
                }else{
                    alert("Error al crear la imagen.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Error no se pudo establecer el servicio.");
            }
    }

    return(
        <div>
            <h1>Alta imagen formulario</h1>
            <form onSubmit={enviar}>
                <div>
                    <label htmlFor="idAlojamiento">idAlojamiento</label>
                    <input type="number" id="IdAlojamiento" value={idAlojamiento}
                    onChange={(e) => setIdAlojamiento(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="Ruta">Ruta</label>
                    <input type="text" id="Ruta" value={ruta}
                    onChange={(e) => setRuta(e.target.value)}/>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
};

export default AddImagen;