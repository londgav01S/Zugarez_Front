import React, { useState } from "react";
import { getProductosCaducadosPorFechas } from "../../Services/InventarioApiService";

function ProductosCaducadosPorFecha() {
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleBuscar = async () => {
        setLoading(true);
        const data = await getProductosCaducadosPorFechas(desde, hasta);
        setProductos(data);
        setLoading(false);
    };

    return (
        <div className="caducados-container">
            <style>
                {`
                .caducados-container {
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                    font-family: "Segoe UI", sans-serif;
                }

                .caducados-title {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #333;
                }

                .date-inputs {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .date-inputs input,
                .date-inputs button {
                    padding: 8px 12px;
                    font-size: 16px;
                }

                .date-inputs button {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .date-inputs button:hover {
                    background-color: #0056b3;
                }

                .caducados-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }

                .caducados-table th,
                .caducados-table td {
                    border: 1px solid #ccc;
                    padding: 10px;
                    text-align: center;
                }

                .caducados-table th {
                    background-color: #f2f2f2;
                }

                .no-result {
                    text-align: center;
                    margin-top: 30px;
                    font-style: italic;
                    color: #666;
                }

                .loading {
                    text-align: center;
                    margin-top: 20px;
                    font-style: italic;
                    color: #007bff;
                }
            `}
            </style>

            <h2 className="caducados-title">Productos Caducados por Rango de Fechas</h2>
            <div className="date-inputs">
                <input
                    type="date"
                    value={desde}
                    onChange={(e) => setDesde(e.target.value)}
                />
                <input
                    type="date"
                    value={hasta}
                    onChange={(e) => setHasta(e.target.value)}
                />
                <button onClick={handleBuscar}>Buscar</button>
            </div>

            {loading ? (
                <p className="loading">Cargando productos caducados...</p>
            ) : productos.length > 0 ? (
                <table className="caducados-table">
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
            ) : (
                <p className="no-result">No hay productos caducados en el rango seleccionado.</p>
            )}
        </div>
    );
}

export default ProductosCaducadosPorFecha;
