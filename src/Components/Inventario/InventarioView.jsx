import {Route, Routes, useNavigate} from "react-router-dom";
import DestalleInventarioView from "../../Modals/FormularioInventario/DestalleInventarioView";
import {useEffect, useState} from "react";
import {getLowStockProducts} from "../../Services/InventarioApiService";


function InventarioView() {

    const navigate = useNavigate();
    const [lowStockProducts, setLowStockProducts] = useState([]);

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

    return (
        <div>
            <h1>INVENTARIO</h1>

            {/* Contenedor para los botones con flexbox */}
            <div style={{display: "flex", gap: "10px"}}>
                <button onClick={() => navigate("/producto")}>Productos</button>
                <button onClick={() => navigate("/inventario/detalle")}>Detalle Inventario</button>
            </div>
        </div>
    );
}

export default InventarioView;