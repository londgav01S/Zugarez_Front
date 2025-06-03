import {Route, Routes, useNavigate} from "react-router-dom";
import DestalleInventarioView from "../../Modals/FormularioInventario/DestalleInventarioView";
import {useEffect, useState} from "react";
import {getLowStockProducts, getProductosPorVencer} from "../../Services/InventarioApiService";


function InventarioView() {

    const navigate = useNavigate();
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [productosPorVencer, setProductosPorVencer] = useState([]);


    useEffect(() => {
        const fetchLowStock = async () => {
            try {
                const products = await getLowStockProducts(); // Llamar a la API
                setLowStockProducts(products);

                if (products.length > 0) {
                    alert(`⚠️ ¡Atención! Hay ${products.length} productos con bajo stock.`);
                }
            } catch (error) {
                console.error("Error al obtener productos con bajo stock:", error);
            }
        };

        fetchLowStock();
    }, []);

    useEffect(() => {
        getProductosPorVencer().then(setProductosPorVencer);
    }, []);

    return (
        <div>
            <h1>INVENTARIO</h1>
            {productosPorVencer.length > 0 && (
                <div style={{ background: "#fff4cc", padding: "10px", border: "1px solid #cc9900", marginBottom: "20px" }}>
                    <h3>⚠️ Productos por vencer en los próximos 10 días:</h3>
                    <ul>
                        {productosPorVencer.map(p => (
                            <li key={p.id}>{p.nombre} (vence el {p.fechaVencimiento})</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Contenedor para los botones con flexbox */}
            <div style={{display: "flex", gap: "10px"}}>
                <button onClick={() => navigate("/producto")}>Productos</button>
                <button onClick={() => navigate("/inventario/detalle")}>Detalle Inventario</button>
                <button onClick={() => navigate("/verificacion")}>Registrar Fecha de Verificación</button>
                <button onClick={() => navigate("/caducados")}>Listar Productos Caducados</button>
                <button onClick={() => navigate("/desecho")}>Registrar Desecho con Justificación</button>
                <button onClick={() => navigate("/plan")}>Agregar Observaciones al Plan de Abastecimiento</button>
                <button onClick={() => navigate("/pedido")}>Registrar Pedido a Proveedor</button>
                <button onClick={() => navigate("/historial-pedidos")}>Ver Historial de Pedidos</button>
                <button onClick={() => navigate("/pedido")}>Validar Cantidad Mínima por Producto (integrado)</button>
                <button onClick={() => navigate("/recepcion")}>Registrar Conformidad de Pedido Recibido</button>
                <button onClick={() => navigate("/resumen")}>Resumen de Entradas/Salidas por Producto</button>

            </div>
        </div>
    );
}

export default InventarioView;