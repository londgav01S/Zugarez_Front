import React, { useState, useEffect } from "react";
import {
    createInventoryDetail,
    updateInventoryDetail,
    deleteInventoryDetail,
    getInventoryDetails,
    getProducts
} from "../../Services/InventarioApiService";
import "./Detalle.css";

const DetalleInventarioView = () => {
    const [inventoryDetails, setInventoryDetails] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        productoId: "",  // Agregado productoId
        cantidad: 0,
        caducados: 0,
        disponibles: 0,
        vendidos: 0,
        perdidos: 0
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchInventoryDetails();
        fetchProducts();
    }, []);

    const fetchInventoryDetails = async () => {
        const data = await getInventoryDetails();
        setInventoryDetails(data);
    };

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const openCreateModal = () => {
        setSelectedDetail(null);
        setFormData({
            id: "",
            productoId: "",
            cantidad: 0,
            caducados: 0,
            disponibles: 0,
            vendidos: 0,
            perdidos: 0
        });
        setShowModal(true);
    };

    const openEditModal = (detail) => {
        setSelectedDetail(detail);
        setFormData({
            id: detail.id,
            productoId: detail.producto?.id || "",  // Corregido
            cantidad: detail.cantidad,
            caducados: detail.caducados,
            disponibles: detail.disponibles,
            vendidos: detail.vendidos,
            perdidos: detail.perdidos
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.productoId) {
            alert("Selecciona un producto antes de guardar.");
            return;
        }

        if (selectedDetail) {
            await updateInventoryDetail(selectedDetail.id, {
                productoId: formData.productoId,
                cantidad: formData.cantidad,
                caducados: formData.caducados,
                disponibles: formData.disponibles,
                vendidos: formData.vendidos,
                perdidos: formData.perdidos
            });
        } else {
            await createInventoryDetail(formData.productoId, {
                cantidad: formData.cantidad,
                caducados: formData.caducados,
                disponibles: formData.disponibles,
                vendidos: formData.vendidos,
                perdidos: formData.perdidos
            });
        }

        fetchInventoryDetails();
        setShowModal(false);
    };

    const handleDelete = async (id) => {
        await deleteInventoryDetail(id);
        fetchInventoryDetails();
    };

    return (
        <div>
            <h1>Inventario</h1>

            <button onClick={openCreateModal}>Agregar Detalle</button>

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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedDetail ? "Editar Detalle" : "Agregar Detalle"}</h2>

                        <label>Producto:</label>
                        <select
                            name="productoId"
                            value={formData.productoId}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione un producto</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.nombre}
                                </option>
                            ))}
                        </select>

                        <label>Cantidad:</label>
                        <input
                            type="number"
                            name="cantidad"
                            value={formData.cantidad}
                            onChange={handleChange}
                        />
                        <label>Caducados:</label>
                        <input
                            type="number"
                            name="caducados"
                            value={formData.caducados}
                            onChange={handleChange}
                        />
                        <label>Disponibles:</label>
                        <input
                            type="number"
                            name="disponibles"
                            value={formData.disponibles}
                            onChange={handleChange}
                        />
                        <label>Vendidos:</label>
                        <input
                            type="number"
                            name="vendidos"
                            value={formData.vendidos}
                            onChange={handleChange}
                        />
                        <label>Perdidos:</label>
                        <input
                            type="number"
                            name="perdidos"
                            value={formData.perdidos}
                            onChange={handleChange}
                        />
                        <div style={{ marginTop: "10px" }}>
                            <button onClick={handleSave}>Guardar</button>
                            <button onClick={() => setShowModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetalleInventarioView;
