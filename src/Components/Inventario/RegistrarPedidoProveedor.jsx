import React, { useState, useEffect } from "react";
import { getProducts, registrarPedidoProveedor } from "../../Services/InventarioApiService";

function RegistrarPedidoProveedor() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        productoId: "",
        cantidad: 0,
        fecha: "",
        categoria: "Pedido a Proveedor",
        descripcion: "", // observación
        minimoPedido: 0
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
        const producto = productos.find(p => p.id === form.productoId);

        if (!producto) {
            alert("Debe seleccionar un producto válido");
            return;
        }

        if (form.cantidad < producto.minimoPedido) {
            alert(`La cantidad mínima permitida para este producto es ${producto.minimoPedido}`);
            return;
        }

        if (!form.descripcion.trim()) {
            alert("La observación es obligatoria");
            return;
        }

        await registrarPedidoProveedor(form);
        alert("Pedido registrado correctamente");
    };


    return (
        <div>
            <h2>Formulario de Pedido a Proveedor</h2>
            <select onChange={handleProducto}>
                <option value="">Seleccione producto</option>
                {productos.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
            </select>
            <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} placeholder="Cantidad"/>
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange}/>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Observación"/>
            <button onClick={handleSubmit}>Registrar Pedido</button>
        </div>
    );
}

export default RegistrarPedidoProveedor;
