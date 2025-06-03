import React, { useState, useEffect } from "react";
import { getProducts, registrarDesecho } from "../../Services/InventarioApiService";

function RegistrarDesecho() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        productoId: "",
        cantidad: 0,
        fecha: "",
        categoria: "Desecho",
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
        if (!form.descripcion.trim()) {
            alert("La justificación (descripción) es obligatoria");
            return;
        }
        await registrarDesecho(form);
        alert("Desecho registrado con éxito");
        // Opcional: limpiar formulario tras enviar
        setForm({
            productoId: "",
            cantidad: 0,
            fecha: "",
            categoria: "Desecho",
            descripcion: ""
        });
    };

    return (
        <div className="desecho-container">
            <style>
                {`
          .desecho-container {
            max-width: 500px;
            margin: 20px auto;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background: #fafafa;
          }

          h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
          }

          select, input[type="number"], input[type="date"], textarea {
            width: 100%;
            padding: 8px 10px;
            margin-bottom: 15px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 16px;
            box-sizing: border-box;
          }

          textarea {
            resize: vertical;
            min-height: 80px;
          }

          button {
            width: 100%;
            padding: 10px;
            background-color: #28a745;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          button:hover {
            background-color: #218838;
          }
        `}
            </style>

            <h2>Desechar Producto</h2>

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
                placeholder="Justificación"
            />

            <button onClick={handleSubmit}>Registrar Desecho</button>
        </div>
    );
}

export default RegistrarDesecho;
