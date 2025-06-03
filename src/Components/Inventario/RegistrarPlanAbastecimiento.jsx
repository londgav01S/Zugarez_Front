import React, { useState, useEffect } from "react";
import { getProducts, registrarPlanAbastecimiento } from "../../Services/InventarioApiService";

function RegistrarPlanAbastecimiento() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        productoId: "",
        cantidad: 0,
        fecha: "",
        categoria: "Plan Abastecimiento",
        descripcion: "" // Observación
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
            alert("La observación es obligatoria");
            return;
        }
        await registrarPlanAbastecimiento(form);
        alert("Plan de abastecimiento registrado");
    };

    return (
        <div>
            <h2>Registrar Plan de Abastecimiento</h2>
            <select onChange={handleProducto}>
                <option value="">Seleccione producto</option>
                {productos.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
            </select>
            <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} placeholder="Cantidad" />
            <input type="date" name="fecha" value={form.fecha} onChange={handleChange} />
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Observación" />
            <button onClick={handleSubmit}>Registrar Plan</button>
        </div>
    );
}

export default RegistrarPlanAbastecimiento;
