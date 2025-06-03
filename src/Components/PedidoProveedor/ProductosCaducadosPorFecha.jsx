import React, { useState } from "react";
import { getProductosCaducadosPorFechas } from "../../Services/InventarioApiService";

function ProductosCaducadosPorFecha() {
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [productos, setProductos] = useState([]);

    const handleBuscar = async () => {
        const data = await getProductosCaducadosPorFechas(desde, hasta);
        setProductos(data);
    };

    return (
        <div>
            <h2>Productos Caducados por Rango de Fechas</h2>
            <div style={{ display: "flex", gap: "10px" }}>
                <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
                <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
                <button onClick={handleBuscar}>Buscar</button>
            </div>

            <table border="1" style={{ marginTop: "20px" }}>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Fecha Vencimiento</th>
                    <th>Estado</th>
                </tr>
                </thead>
                <tbody>
                {productos.map((p) => (
                    <tr key={p.id}>
                        <td>{p.nombre}</td>
                        <td>{p.marca}</td>
                        <td>{p.fechaVencimiento}</td>
                        <td>{p.estado}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductosCaducadosPorFecha;
