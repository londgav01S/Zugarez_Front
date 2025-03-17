import { useEffect, useState } from "react";
import {getProducts} from "../../Services/InventarioApiService";
import "./CrudProducto.css";


function ProductList() {
    const [productos, setProductos] = useState([]);

    const handleFetchProducts = () => {
        getProducts().then(data => setProductos(data));
    };

    return (
        <div className="container">
            <div className="card">
                <h2 className="crearProducto">Lista de Productos</h2>
                <button className="enter" onClick={handleFetchProducts}>Obtener Productos</button>
                <table className="productTable">
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Marca</th>
                        <th>Fecha Vencimiento</th>
                        <th>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {productos.length > 0 ? (
                        productos.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.marca}</td>
                                <td>{producto.fechaVencimiento}</td>
                                <td>{producto.estado}</td>
                            </tr>
                        ))
                    ) : (
                        Array.from({ length: 3 }).map((_, index) => (
                            <tr key={index}>
                                <td colSpan="6" style={{ textAlign: "center", color: "#aaa" }}>-</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export { ProductList };
