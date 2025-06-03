import React, { useEffect, useState } from "react";
import { getHistorialPedidosProveedor, getProducts } from "../../Services/InventarioApiService";

function HistorialPedidosProveedor() {
    const [pedidos, setPedidos] = useState([]);
    const [productosMap, setProductosMap] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const productos = await getProducts();
                const map = {};
                productos.forEach(p => {
                    map[p.id] = p.nombre;
                });
                setProductosMap(map);

                const data = await getHistorialPedidosProveedor();
                setPedidos(data);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="historial-container">
            <style>{`
        .historial-container {
          max-width: 800px;
          margin: 40px auto;
          padding: 25px 30px;
          background: #fefefe;
          border-radius: 12px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h2 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
          font-weight: 700;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 16px;
          color: #444;
        }

        thead tr {
          background-color: #007bff;
          color: white;
          text-align: left;
          font-weight: 600;
        }

        th, td {
          padding: 12px 15px;
          border-bottom: 1px solid #ddd;
        }

        tbody tr:hover {
          background-color: #f1f7ff;
          cursor: default;
        }

        tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        tbody td {
          vertical-align: middle;
        }
      `}</style>

            <h2>Historial de Pedidos a Proveedor</h2>

            <table>
                <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Fecha</th>
                    <th>Observación</th>
                </tr>
                </thead>
                <tbody>
                {pedidos.length === 0 ? (
                    <tr>
                        <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                            No hay pedidos registrados.
                        </td>
                    </tr>
                ) : (
                    pedidos.map((p) => (
                        <tr key={p.id}>
                            <td>{productosMap[p.productoId] || "Producto no encontrado"}</td>
                            <td>{p.cantidad}</td>
                            <td>{p.fecha}</td>
                            <td>{p.descripcion}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

export default HistorialPedidosProveedor;
