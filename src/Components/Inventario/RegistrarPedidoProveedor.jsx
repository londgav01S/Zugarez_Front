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

        try {
            await registrarPedidoProveedor(form);
            alert("Pedido registrado correctamente");
            setForm({
                productoId: "",
                cantidad: 0,
                fecha: "",
                categoria: "Pedido a Proveedor",
                descripcion: "",
                minimoPedido: 0
            });
        } catch (error) {
            console.error("Error al registrar el pedido:", error);
            alert("Hubo un error al registrar el pedido");
        }
    };

    return (
        <div className="pedido-container">
            <style>
                {`
          .pedido-container {
            max-width: 520px;
            margin: 30px auto;
            padding: 25px 30px;
            border-radius: 10px;
            background-color: #f9f9f9;
            box-shadow: 0 3px 8px rgba(0,0,0,0.1);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          h2 {
            text-align: center;
            margin-bottom: 25px;
            color: #444;
            font-weight: 600;
          }

          select, input[type="number"], input[type="date"], textarea {
            width: 100%;
            padding: 10px 14px;
            margin-bottom: 18px;
            border-radius: 6px;
            border: 1.5px solid #ccc;
            font-size: 16px;
            box-sizing: border-box;
            transition: border-color 0.25s ease;
          }

          select:focus, input[type="number"]:focus, input[type="date"]:focus, textarea:focus {
            border-color: #007bff;
            outline: none;
          }

          textarea {
            min-height: 90px;
            resize: vertical;
          }

          button {
            width: 100%;
            padding: 12px 0;
            background-color: #007bff;
            border: none;
            border-radius: 7px;
            color: white;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          button:hover {
            background-color: #0056b3;
          }
        `}
            </style>

            <h2>Formulario de Pedido a Proveedor</h2>

            <select value={form.productoId} onChange={handleProducto}>
                <option value="">Seleccione producto</option>
                {productos.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
            </select>

            <input
                type="number"
                name="cantidad"
                value={form.cantidad}
                onChange={handleChange}
                placeholder="Cantidad"
                min="0"
            />

            <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
            />

            <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Observación"
            />

            <button onClick={handleSubmit}>Registrar Pedido</button>
        </div>
    );
}

export default RegistrarPedidoProveedor;
