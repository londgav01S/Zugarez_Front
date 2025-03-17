import { useState, useEffect } from "react";
import { deleteProduct, getProducts, updateProduct } from "../../Services/InventarioApiService";

function UpdateProduct() {
    const [productos, setProductos] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [producto, setProducto] = useState({
        nombre: "",
        precio: "",
        cantidad: "",
        marca: "",
        fechaVencimiento: "",
        estado: "Por vencer",
    });
    const [showForm, setShowForm] = useState(false); // Controla si se muestran los campos para actualizar

    useEffect(() => {
        loadProducts();
        const intervalId = setInterval(loadProducts, 5000); // Actualiza cada 5 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar
    }, []);

    const loadProducts = async () => {
        const productosData = await getProducts();
        console.log("Productos traídos del backend:", productosData); // Verifica los datos obtenidos
        setProductos(productosData);
    };

    const handleSelectChange = (event) => {
        const id = event.target.value;
        setSelectedId(id);
        setShowForm(false); // Ocultar el formulario hasta que se oprima "Actualizar"
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProducto((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateClick = () => {
        if (selectedId) {
            const selectedProduct = productos.find((p) => p.id === selectedId);
            if (selectedProduct) {
                setProducto(selectedProduct);
                setShowForm(true); // Mostrar los campos para editar
            }
        } else {
            alert("Seleccione un producto primero.");
        }
    };

    const handleUpdate = async () => {
        if (await updateProduct(selectedId, producto)) {
            alert("Producto actualizado con éxito");
            setShowForm(false);
            loadProducts();
        } else {
            alert("Error al actualizar el producto");
        }
    };

    const handleDelete = async () => {
        if (selectedId && window.confirm("¿Estás seguro de eliminar este producto?")) {
            if (await deleteProduct(selectedId)) {
                alert("Producto eliminado con éxito");
                setSelectedId("");
                setShowForm(false);
                loadProducts();
            } else {
                alert("Error al eliminar el producto");
            }
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Actualizar o Eliminar Producto</h2>

                {/* Selector de productos */}
                <select value={selectedId} onChange={handleSelectChange} className="inputBox">
                    <option value="">Seleccione un producto</option>
                    {productos.map((p) => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                </select>

                {/* Botones visibles solo si hay un producto seleccionado */}
                {selectedId && (
                    <div>
                        <button className="enter" onClick={handleUpdateClick}>Actualizar</button>
                        <button className="enter" onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>Eliminar</button>
                    </div>
                )}

                {/* Formulario visible solo cuando se presiona "Actualizar" */}
                {showForm && (
                    <>
                        <div className="inputBox">
                            <input type="text" name="nombre" value={producto.nombre} onChange={handleInputChange} required />
                            <span>Nombre</span>
                        </div>

                        <div className="inputBox">
                            <input type="number" name="precio" value={producto.precio} onChange={handleInputChange} required />
                            <span>Precio</span>
                        </div>

                        <div className="inputBox">
                            <input type="number" name="cantidad" value={producto.cantidad} onChange={handleInputChange} required />
                            <span>Cantidad</span>
                        </div>

                        <div className="inputBox">
                            <input type="text" name="marca" value={producto.marca} onChange={handleInputChange} required />
                            <span>Marca</span>
                        </div>

                        <div className="inputBox">
                            <input type="date" name="fechaVencimiento" value={producto.fechaVencimiento} onChange={handleInputChange} required />
                            <span>Fecha de Vencimiento</span>
                        </div>

                        <div className="inputBox">
                            <select name="estado" value={producto.estado} onChange={handleInputChange} className="inputBox">
                                <option value="Por vencer">Por vencer</option>
                                <option value="Vencido">Vencido</option>
                                <option value="A tiempo">A tiempo</option>
                            </select>
                            <span>Estado</span>
                        </div>

                        <button className="enter" onClick={handleUpdate}>Guardar Cambios</button>
                    </>
                )}
            </div>
        </div>
    );
}

export { UpdateProduct };