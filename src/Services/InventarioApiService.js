const BASE_URL = "http://localhost:8080/api";
const API_PRODUCTS = `${BASE_URL}/productos`;
const API_INVENTORY = `${BASE_URL}/inventario`;
const API_DETAIL = `${BASE_URL}/detalleInventario`;

const defaultHeaders = {
    "Content-Type": "application/json"
};

/**
 * 📌 CRUD PARA PRODUCTOS
 */
export const registerProduct = async (producto) => {
    try {
        const response = await fetch(`${API_PRODUCTS}/crearProducto`, {
            method: "POST",
            headers: defaultHeaders,
            body: JSON.stringify(producto),
            credentials: "include"
        });

        if (!response.ok) throw new Error("Error al registrar el producto");

        console.log("Producto registrado exitosamente");
        alert("Registro de producto exitoso");
    } catch (error) {
        console.error("Error:", error);
    }
};

export const getProducts = async () => {
    try {
        const response = await fetch(`${API_PRODUCTS}/obtenerProductos`, { credentials: "include" });
        if (!response.ok) throw new Error("Error al obtener productos");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

export const updateProduct = async (id, updatedProduct) => {
    try {
        const response = await fetch(`${API_PRODUCTS}/${id}`, {
            method: "PUT",
            headers: defaultHeaders,
            body: JSON.stringify(updatedProduct),
            credentials: "include"
        });

        if (!response.ok) throw new Error("Error al actualizar el producto");

        console.log("Producto actualizado exitosamente");
        alert("Producto actualizado con éxito");
        return true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_PRODUCTS}/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (!response.ok) throw new Error("Error al eliminar el producto");

        console.log("Producto eliminado exitosamente");
        alert("Producto eliminado con éxito");
        return true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};

/**
 * 📌 CRUD PARA DETALLE DE INVENTARIO
 */
export const createInventoryDetail = async (productoId, detail) => {
    try {
        const response = await fetch(`http://localhost:8080/api/detalleInventario/${productoId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(detail),
            credentials: "include",
        });

        if (!response.ok) throw new Error("Error al crear el detalle de inventario");

        console.log("Detalle de inventario creado con éxito");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};


export const getInventoryDetailsByProduct = async (productId) => {
    try {
        const response = await fetch(`${API_DETAIL}/producto/${productId}`, { credentials: "include" });
        if (!response.ok) throw new Error("Error al obtener detalles de inventario");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

export const updateInventoryDetail = async (id, updatedDetail) => {
    try {
        const response = await fetch(`${API_DETAIL}/${id}`, {
            method: "PUT",
            headers: defaultHeaders,
            body: JSON.stringify(updatedDetail),
            credentials: "include"
        });

        if (!response.ok) throw new Error("Error al actualizar el detalle de inventario");

        console.log("Detalle de inventario actualizado con éxito");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const deleteInventoryDetail = async (id) => {
    try {
        const response = await fetch(`${API_DETAIL}/${id}`, {
            method: "DELETE",
            credentials: "include"
        });

        if (!response.ok) throw new Error("Error al eliminar el detalle de inventario");

        console.log("Detalle de inventario eliminado con éxito");
        return true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};

/**
 * 📌 CONSULTAS DE INVENTARIO
 */
export const getStock = async () => {
    try {
        const response = await fetch(`${API_INVENTORY}/stock`, { credentials: "include" });
        if (!response.ok) throw new Error("Error al obtener stock");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

export const getStockByProduct = async (productId) => {
    try {
        const response = await fetch(`${API_INVENTORY}/stock/${productId}`, { credentials: "include" });
        if (!response.ok) throw new Error("Error al obtener stock del producto");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const getLowStockProducts = async () => {
    try {
        const response = await fetch(`${API_INVENTORY}/low-stock`, { credentials: "include" });
        if (!response.ok) throw new Error("Error al obtener productos con bajo stock");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

export const getInventoryDetails = async () => {
    try {
        const response = await fetch(API_DETAIL, { credentials: "include" });
        if (!response.ok) throw new Error("Error al obtener detalle de inventario");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

export const getConsolidatedInventory = async () => {
    try {
        const response = await fetch(`${API_DETAIL}/consolidado`, { credentials: "include" });
        if (!response.ok) throw new Error("Error al obtener consolidado de inventario");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return {};
    }
};

export const registrarFechaVerificacion = async (inventarioId, fechaVerificacion) => {
    try {
        const response = await fetch(`http://localhost:8080/api/inventario/verificar/${inventarioId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fechaVerificacion }),
        });

        if (!response.ok) throw new Error("Error al registrar fecha de verificación");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const getProductosCaducadosPorFechas = async (desde, hasta) => {
    try {
        const response = await fetch(`http://localhost:8080/api/productos/caducados?desde=${desde}&hasta=${hasta}`);
        if (!response.ok) throw new Error("Error al obtener productos caducados por fechas");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

export const registrarDesecho = async (salida) => {
    try {
        const response = await fetch("http://localhost:8080/api/entrada-salida/desecho", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(salida),
        });

        if (!response.ok) throw new Error("Error al registrar desecho");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const getProductosPorVencer = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/productos/por-vencer");
        if (!response.ok) throw new Error("Error al obtener productos por vencer");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

export const registrarPlanAbastecimiento = async (plan) => {
    try {
        const response = await fetch("http://localhost:8080/api/entrada-salida/plan-abastecimiento", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plan),
        });

        if (!response.ok) throw new Error("Error al registrar plan de abastecimiento");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const registrarPedidoProveedor = async (pedido) => {
    try {
        const response = await fetch("http://localhost:8080/api/entrada-salida/pedido", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido),
        });

        if (!response.ok) throw new Error("Error al registrar pedido");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const getHistorialPedidosProveedor = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/entrada-salida/historial-pedidos");
        if (!response.ok) throw new Error("Error al obtener historial de pedidos");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

export const registrarRecepcionPedido = async (registro) => {
    try {
        const response = await fetch("http://localhost:8080/api/entrada-salida/pedido-recibido", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registro),
        });

        if (!response.ok) throw new Error("Error al registrar la recepción del pedido");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const getResumenMovimientosPorProducto = async (productoId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/entrada-salida/resumen/${productoId}`);
        if (!response.ok) throw new Error("Error al obtener resumen de movimientos");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

