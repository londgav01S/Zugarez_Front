import React, { useEffect, useState } from "react";
import { getProductosPorVencer } from "../../Services/InventarioApiService";

function AlertaProductosPorVencer() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        getProductosPorVencer().then(setProductos);
    }, []);

    if (productos.length === 0) return null;

    return (
        <div style={{ background: "#fff4cc", padding: "10px", border: "1px solid #cc9900" }}>
            <h3>⚠️ Productos por vencer en los próximos 10 días:</h3>
            <ul>
                {productos.map(p => (
                    <li key={p.id}>
                        {p.nombre} (vence el {p.fechaVencimiento})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AlertaProductosPorVencer;
