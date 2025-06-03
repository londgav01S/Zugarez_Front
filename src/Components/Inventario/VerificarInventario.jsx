import { useState } from "react";
import { registrarFechaVerificacion } from "../../Services/InventarioApiService";

function VerificarInventario({ inventarioId }) {
    const [fecha, setFecha] = useState("");

    const handleSubmit = async () => {
        const result = await registrarFechaVerificacion(inventarioId, fecha);
        if (result) {
            alert("Verificación registrada correctamente");
        }
    };

    return (
        <div>
            <h2>Registrar Verificación de Inventario</h2>
            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
            />
            <button onClick={handleSubmit}>Registrar</button>
        </div>
    );
}

export default VerificarInventario;
