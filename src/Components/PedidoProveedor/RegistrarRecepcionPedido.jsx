import React, { useState, useEffect } from "react";
import { getProducts, registrarRecepcionPedido } from "../../Services/InventarioApiService";

function RegistrarRecepcionPedido() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        productoId: "",
        cantidad: 0,
        fecha: "",
        categoria: "CONFORME", // o INCONFORME
        descripcion: ""
    });

    useEffect(() => {
        getProducts().then(setProductos);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleProducto = (e) => {
        setForm({ ...form, productoId: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.fecha || !form.productoId) {
            alert("Debe completar todos los campos");
            return;
        }

        await registrarRecepcionPedido(form);
        alert("Recepción registrada correctamente");
    };

    return (
        <div>
            <h2>Registrar Recepción de Pedido</h2>
            <select onChange={handleProducto}>
                <option value="">Seleccione producto</option>
                {productos.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
            </select>
            <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} placeholder="Cantidad recibida" />
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
            <select name="categoria" value={form.categoria} onChange={handleChange}>
                <option value="CONFORME">Conforme</option>
                <option value="INCONFORME">Inconforme</option>
            </select>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Comentario u observación" />
            <button onClick={handleSubmit}>Registrar Recepción</button>
        </div>
    );
}

export default RegistrarRecepcionPedido;
