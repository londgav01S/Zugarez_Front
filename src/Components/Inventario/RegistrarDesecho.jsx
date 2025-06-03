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
    };

    return (
        <div>
            <h2>Desechar Producto</h2>
            <select onChange={handleProducto}>
                <option value="">Seleccione producto</option>
                {productos.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
            </select>
            <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} placeholder="Cantidad" />
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Justificación" />
            <button onClick={handleSubmit}>Registrar Desecho</button>
        </div>
    );
}

export default RegistrarDesecho;
