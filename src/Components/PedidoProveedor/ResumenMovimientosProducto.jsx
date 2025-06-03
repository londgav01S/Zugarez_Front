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
        <div>
            <h2>Resumen de Movimientos por Producto</h2>
            <select onChange={(e) => setProductoId(e.target.value)}>
                <option value="">Seleccione producto</option>
                {productos.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
            </select>
            <button onClick={handleFetchResumen}>Ver resumen</button>

            {resumen && (
                <div>
                    <h3>Entradas: {resumen.totalEntradas}</h3>
                    <h3>Salidas: {resumen.totalSalidas}</h3>
                    <table border="1">
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
