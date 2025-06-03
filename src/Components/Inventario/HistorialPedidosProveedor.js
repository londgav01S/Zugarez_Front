import React, { useEffect, useState } from "react";
import { getHistorialPedidosProveedor, getProducts } from "../../Services/InventarioApiService";

function HistorialPedidosProveedor() {
    const [pedidos, setPedidos] = useState([]);
    const [productosMap, setProductosMap] = useState({});

    useEffect(() => {
        async function fetchData() {
            const productos = await getProducts();
            const map = {};
            productos.forEach(p => {
                map[p.id] = p.nombre;
            });
            setProductosMap(map);

            const data = await getHistorialPedidosProveedor();
            setPedidos(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>Historial de Pedidos a Proveedor</h2>
            <table border="1">
                <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Fecha</th>
                    <th>Observación</th>
                </tr>
                </thead>
                <tbody>
                {pedidos.map((p) => (
                    <tr key={p.id}>
                        <td>{productosMap[p.productoId] || p.productoId}</td>
                        <td>{p.cantidad}</td>
                        <td>{p.fecha}</td>
                        <td>{p.descripcion}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default HistorialPedidosProveedor;
