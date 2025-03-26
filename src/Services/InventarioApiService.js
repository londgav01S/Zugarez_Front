const API_URL = "http://localhost:8080/api/productos";
const API_URL2 = "http://localhost:8080/api/inventario";
const API_URL_POST = "http://localhost:8080/api/productos/crearProducto";
const API_URL_GET = "http://localhost:8080/api/productos/obtenerProductos";
const API_URL_DETALLE = "http://localhost:8080/api/detalle-inventario";

/**
 * Registra un producto en la base de datos enviando datos en formato JSON.
 */
export const registerProduct = async (producto) => {
    console.log(producto);
    try {
        const response = await fetch(API_URL_POST, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(producto),
        });

        if (response.ok) {
            console.log("Producto registrado exitosamente");
            alert("Registro de producto exitoso");
        } else {
            console.error("Error al registrar el producto");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

/**
 * Obtiene la lista de productos desde la API.
 */
export const getProducts = async () => {
    try {
        const response = await fetch(API_URL_GET);
        if (!response.ok) {
            throw new Error("Error al obtener productos");
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

/**
 * Actualiza un producto por su ID enviando datos en formato JSON.
 */
export const updateProduct = async (id, updatedProduct) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            console.log("Producto actualizado exitosamente");
            alert("Producto actualizado con éxito");
            return true;
        } else {
            console.error("Error al actualizar el producto");
            return false;
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};

/**
 * Elimina un producto por su ID.
 */
export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            console.log("Producto eliminado exitosamente");
            alert("Producto eliminado con éxito");
            return true;
        } else {
            console.error("Error al eliminar el producto");
            return false;
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};

/**
 * Obtiene el stock de productos desde la API.
 */
export const getStock = async () => {
    try {
        const response = await fetch(`${API_URL2}/stock`);
        if (!response.ok) throw new Error("Error al obtener stock");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

/**
 * Obtiene el stock de un producto por su ID.
 */
export const getStockByProduct = async (productId) => {
    try {
        const response = await fetch(`${API_URL2}/stock/${productId}`);
        if (!response.ok) throw new Error("Error al obtener stock del producto");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

/**
 * 📌 CRUD PARA DETALLE DE INVENTARIO
 **/

/**
 * Crea un nuevo detalle de inventario.
 */
export const createInventoryDetail = async (detail) => {
    try {
        const response = await fetch(API_URL_DETALLE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(detail),
        });

        if (!response.ok) throw new Error("Error al crear el detalle de inventario");

        console.log("Detalle de inventario creado con éxito");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

/**
 * Obtiene los detalles de inventario de un producto por su ID.
 */
export const getInventoryDetailsByProduct = async (productId) => {
    try {
        const response = await fetch(`${API_URL_DETALLE}/producto/${productId}`);
        if (!response.ok) throw new Error("Error al obtener detalles de inventario");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};

/**
 * Actualiza un detalle de inventario por su ID.
 */
export const updateInventoryDetail = async (id, updatedDetail) => {
    try {
        const response = await fetch(`${API_URL_DETALLE}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedDetail),
        });

        if (!response.ok) throw new Error("Error al actualizar el detalle de inventario");

        console.log("Detalle de inventario actualizado con éxito");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

/**
 * Elimina un detalle de inventario por su ID.
 */
export const deleteInventoryDetail = async (id) => {
    try {
        const response = await fetch(`${API_URL_DETALLE}/${id}`, {
            method: "DELETE",
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
 * Obtiene productos con bajo stock desde la API.
 */
export const getLowStockProducts = async () => {
    try {
        const response = await fetch(`${API_URL2}/low-stock`); // Asegúrate de que esta ruta exista en el backend
        if (!response.ok) throw new Error("Error al obtener productos con bajo stock");
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
};
