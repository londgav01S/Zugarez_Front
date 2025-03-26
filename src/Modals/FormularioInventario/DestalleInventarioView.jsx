import React, { useState, useEffect } from "react";
import {
    getStock,
    getStockByProduct,
    createInventoryDetail,
    updateInventoryDetail,
    deleteInventoryDetail
} from "../../Services/InventarioApiService";
import "./Detalle.css";

const DetalleInventarioView = () => {
    const [stock, setStock] = useState([]);
    const [productStock, setProductStock] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [details, setDetails] = useState([]);
    const [detailForm, setDetailForm] = useState({
        id: "",
        productoId: "",
        descripcion: "",
        cantidad: 0
    });

    useEffect(() => {
        fetchStock();
    }, []);

    const fetchStock = async () => {
        const data = await getStock();
        setStock(data);
    };

    const fetchProductStock = async () => {
        if (selectedProduct) {
            const data = await getStockByProduct(selectedProduct);
            setProductStock(data);
            setDetails(data.detalles || []); // Suponiendo que el backend devuelve detalles del producto
        }
    };

    const handleDetailInputChange = (e) => {
        setDetailForm({ ...detailForm, [e.target.name]: e.target.value });
    };

    const handleDetailSubmit = async (e) => {
        e.preventDefault();
        if (detailForm.id) {
            await updateInventoryDetail(detailForm.id, detailForm);
        } else {
            await createInventoryDetail(detailForm);
        }
        setDetailForm({ id: "", productoId: selectedProduct, descripcion: "", cantidad: 0 });
        fetchProductStock();
    };

    const handleEditDetail = (detail) => {
        setDetailForm(detail);
    };

    const handleDeleteDetail = async (id) => {
        await deleteInventoryDetail(id);
        fetchProductStock();
    };

    return (
        <div className={"detalleContainer"}>
            <h2 className={"detalleTitle"}>Detalle de Inventario</h2>

            <button className={"botonDetalle"} onClick={fetchStock}>Actualizar Stock</button>

            <h3 className={"consultarDetalleTitle"}>Consultar Detalle por Producto</h3>
            <select className={"selectProducto"} onChange={(e) => setSelectedProduct(e.target.value)}>
                <option  value="">Seleccione un producto</option>
                {stock.map((item) => (
                    <option key={item.id} value={item.id}>{item.nombre}</option>
                ))}
            </select>

            <button onClick={fetchProductStock} className={"botonDetalle"}>Obtener Detalles</button>

            {productStock && (
                <>
                    <h3>Detalles del Producto</h3>
                    <table border="1">
                        <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {details.map((detail) => (
                            <tr key={detail.id}>
                                <td>{detail.descripcion}</td>
                                <td>{detail.cantidad}</td>
                                <td>
                                    <button onClick={() => handleEditDetail(detail)} className={"botonDetalle"}>Editar</button>
                                    <button onClick={() => handleDeleteDetail(detail.id)} className={"botonDetalle"}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}

            {selectedProduct && (
                <>
                    <h3 className={"consultarDetalleTitle"}>Agregar/Editar Detalle</h3>
                    <form onSubmit={handleDetailSubmit}>
                        <input type="hidden" name="productoId" value={selectedProduct} />
                        <input type="text" name="descripcion" placeholder="Descripción" value={detailForm.descripcion} onChange={handleDetailInputChange} required />
                        <input type="number" name="cantidad" placeholder="Cantidad" value={detailForm.cantidad} onChange={handleDetailInputChange} required />
                        <button className={"botonDetalle"} type="submit">{detailForm.id ? "Actualizar" : "Agregar"}</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default DetalleInventarioView;
