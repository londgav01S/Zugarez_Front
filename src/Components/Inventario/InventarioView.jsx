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
                <div
                    style={{background: "#fff4cc", padding: "10px", border: "1px solid #cc9900", marginBottom: "20px"}}>
                    <h3>⚠️ Productos por vencer en los próximos 10 días:</h3>
                    <ul>
                        {productosPorVencer.map(p => (
                            <li key={p.id}>{p.nombre} (vence el {p.fechaVencimiento})</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Contenedor para los botones con flexbox */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                maxWidth: "900px",
                margin: "0 auto",
                padding: "20px"
            }}>
                {[
                    {path: "/producto", label: "Productos"},
                    {path: "/inventario/detalle", label: "Detalle Inventario"},
                    {path: "/verificacion", label: "Registrar Fecha de Verificación"},
                    {path: "/caducados", label: "Listar Productos Caducados*"},
                    {path: "/desecho", label: "Registrar Desecho con Justificación*"},
                    {path: "/plan", label: "Agregar Observaciones al Plan de Abastecimiento"},
                    {path: "/pedido", label: "Registrar Pedido a Proveedor*"},
                    {path: "/historial-pedidos", label: "Ver Historial de Pedidos*"},
                    {path: "/pedido", label: "Validar Cantidad Mínima por Producto (integrado)"},
                    {path: "/recepcion", label: "Registrar Conformidad de Pedido Recibido"},
                    {path: "/resumen", label: "Resumen de Entradas/Salidas por Producto*"},
                ].map(({path, label}) => (
                    <button
                        key={path + label}
                        onClick={() => navigate(path)}
                        style={{
                            padding: "12px 16px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "14px",
                            transition: "background-color 0.3s ease",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}
                        onMouseEnter={e => e.target.style.backgroundColor = "#45a049"}
                        onMouseLeave={e => e.target.style.backgroundColor = "#4CAF50"}
                    >
                        {label}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default InventarioView;