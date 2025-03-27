import React, { useState, useEffect } from "react";
import {
    createInventoryDetail,
    updateInventoryDetail,
    deleteInventoryDetail,
    getInventoryDetails,
    getProducts // <-- Importamos la función para obtener productos
} from "../../Services/InventarioApiService";
import "./Detalle.css";

const DetalleInventarioView = () => {
    const [inventoryDetails, setInventoryDetails] = useState([]);
    const [products, setProducts] = useState([]); // Lista de productos
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [formData, setFormData] = useState({
        productId: "",
        cantidad: 0,
        caducados: 0,
        disponibles: 0,
        vendidos: 0,
        perdidos: 0
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchInventoryDetails();
        fetchProducts(); // Cargar lista de productos
    }, []);

    const fetchInventoryDetails = async () => {
        const data = await getInventoryDetails();
        setInventoryDetails(data);
    };

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Abrir modal para agregar nuevo detalle
    const openCreateModal = () => {
        setSelectedDetail(null);
        setFormData({
            productId: "",
            cantidad: 0,
            caducados: 0,
            disponibles: 0,
            vendidos: 0,
            perdidos: 0
        });
        setShowModal(true);
    };

    // Abrir modal para editar un detalle existente
    const openEditModal = (detail) => {
        setSelectedDetail(detail);
        setFormData(detail);
        setShowModal(true);
    };

    // Guardar o actualizar detalle
    const handleSave = async () => {
        if (!formData.productId) {
            alert("Selecciona un producto antes de guardar.");
            return;
        }

        if (selectedDetail) {
            await updateInventoryDetail(selectedDetail.id, formData);
        } else {
            await createInventoryDetail(formData.productId, formData);
        }

        fetchInventoryDetails();
        setShowModal(false);
    };


    // Eliminar detalle de inventario
    const handleDelete = async (id) => {
        await deleteInventoryDetail(id);
        fetchInventoryDetails();
    };

    return (
        <div>
            <h1>Inventario</h1>

            {/* Botón para agregar nuevo detalle */}
            <button onClick={openCreateModal}>Agregar Detalle</button>

            {/* Tabla de detalles de inventario */}
            <h2>Detalle de Inventario</h2>
            <table border="1">
                <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Caducados</th>
                    <th>Disponibles</th>
                    <th>Vendidos</th>
                    <th>Perdidos</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {inventoryDetails.map((detail) => (
                    <tr key={detail.id}>
                        <td>{detail.producto ? detail.producto.nombre : "Desconocido"}</td>
                        <td>{detail.cantidad}</td>
                        <td>{detail.caducados}</td>
                        <td>{detail.disponibles}</td>
                        <td>{detail.vendidos}</td>
                        <td>{detail.perdidos}</td>
                        <td>
                            <button onClick={() => openEditModal(detail)}>Editar</button>
                            <button onClick={() => handleDelete(detail.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal para agregar/editar detalle */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedDetail ? "Editar Detalle" : "Agregar Detalle"}</h2>

                        {/* Seleccionar producto en vez de escribir ID */}
                        <label>Producto:</label>
                        <select name="productId" value={formData.productId} onChange={handleChange}>
                            <option value="">Seleccione un producto</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>{product.nombre}</option>
                            ))}
                        </select>

                        <label>Cantidad:</label>
                        <input type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} />
                        <label>Caducados:</label>
                        <input type="number" name="caducados" value={formData.caducados} onChange={handleChange} />
                        <label>Disponibles:</label>
                        <input type="number" name="disponibles" value={formData.disponibles} onChange={handleChange} />
                        <label>Vendidos:</label>
                        <input type="number" name="vendidos" value={formData.vendidos} onChange={handleChange} />
                        <label>Perdidos:</label>
                        <input type="number" name="perdidos" value={formData.perdidos} onChange={handleChange} />
                        <button onClick={handleSave}>Guardar</button>
                        <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetalleInventarioView;
