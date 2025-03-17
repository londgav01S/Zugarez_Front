const API_URL = "http://localhost:8080/api/productos";
const API_URL_POST = "http://localhost:8080/api/productos/crearProducto";
const API_URL_GET = "http://localhost:8080/api/productos/obtenerProductos";

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
            body: JSON.stringify(producto), // Enviar datos como JSON
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
            body: JSON.stringify(updatedProduct), // Enviar datos como JSON
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
