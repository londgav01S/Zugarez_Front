import React, { useEffect, useState } from "react";
import { getProducts, getResumenMovimientosPorProducto } from "../../Services/InventarioApiService";

function ResumenMovimientosProducto() {
    const [productos, setProductos] = useState([]);
    const [productoId, setProductoId] = useState("");
    const [resumen, setResumen] = useState(null);

    useEffect(() => {
        getProducts().then(setProductos);
    }, []);

    const handleFetchResumen = async () => {
        if (productoId) {
            const data = await getResumenMovimientosPorProducto(productoId);
            setResumen(data);
        }
    };

    return (
        <div className="resumen-container">
            <style>{`
        .resumen-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 30px 35px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }

        h2 {
          text-align: center;
          margin-bottom: 25px;
          font-weight: 700;
          color: #2c3e50;
        }

        select, button {
          padding: 10px 15px;
          margin-right: 15px;
          border-radius: 6px;
          border: 1.8px solid #007bff;
          font-size: 16px;
          outline: none;
          transition: background-color 0.3s ease, color 0.3s ease;
          cursor: pointer;
        }

        select {
          min-width: 220px;
          color: #2c3e50;
          background-color: #fff;
        }

        select:hover, select:focus {
          border-color: #0056b3;
        }

        button {
          background-color: #007bff;
          color: white;
          border: none;
        }

        button:hover {
          background-color: #0056b3;
        }

        h3 {
          margin-top: 30px;
          margin-bottom: 10px;
          font-weight: 600;
          color: #34495e;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          font-size: 16px;
          color: #444;
        }

        thead tr {
          background-color: #007bff;
          color: white;
          font-weight: 600;
        }

        th, td {
          padding: 12px 18px;
          border: 1px solid #ddd;
          text-align: left;
        }

        tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        tbody tr:hover {
          background-color: #e6f0ff;
        }
      `}</style>

            <h2>Resumen de Movimientos por Producto</h2>

            <div>
                <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
                    <option value="">Seleccione producto</option>
                    {productos.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                </select>
                <button onClick={handleFetchResumen}>Ver resumen</button>
            </div>

            {resumen && (
                <div>
                    <h3>Entradas: {resumen.totalEntradas}</h3>
                    <h3>Salidas: {resumen.totalSalidas}</h3>

                    <table>
                        <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Cantidad</th>
                            <th>Fecha</th>
                            <th>Categoría</th>
                            <th>Observación</th>
                        </tr>
                        </thead>
                        <tbody>
                        {resumen.movimientos.map(mov => (
                            <tr key={mov.id}>
                                <td>{mov.tipo}</td>
                                <td>{mov.cantidad}</td>
                                <td>{mov.fecha}</td>
                                <td>{mov.categoria}</td>
                                <td>{mov.descripcion}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ResumenMovimientosProducto;
