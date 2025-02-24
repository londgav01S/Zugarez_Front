import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/productos';

const productoInicial = {
  id: '',
  nombre: '',
  precio: 0,
  fechaVencimiento: '',
  stockCantidad: 0,
  proveedorId: ''
};

function App() {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState(productoInicial);

  useEffect(() => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => setProductos(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
    const newProduct = await response.json();
    setProductos([...productos, newProduct]);
    setProducto(productoInicial);
  };

  return (
      <div>
        <h1>Inventario</h1>
        <form onSubmit={handleSubmit}>
          <div className={"container"}>
            <label>Nombre del Producto</label>
            <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre"
                   required/>
          </div>

          <div className={"container"}>
            <label>Precio</label>
            <input type="number" name="precio" value={producto.precio} onChange={handleChange} placeholder="Precio"
                   required/>
          </div>

          <div className={"container"}>
            <label>Fecha de Vencimiento</label>
            <input type="date" name="fechaVencimiento" value={producto.fechaVencimiento} onChange={handleChange}
                   required/>
          </div>


          <div className={"container"}>
            <label>Cantidad en Stock</label>
            <input type="number" name="stockCantidad" value={producto.stockCantidad} onChange={handleChange}
                   placeholder="Cantidad" required/>
          </div>

          <div className={"container"}>
            <label>ID del Proveedor</label>
            <input type="text" name="proveedorId" value={producto.proveedorId} onChange={handleChange}
                   placeholder="ID Proveedor" required/>
          </div>

          <button type="submit">Agregar Producto</button>
        </form>
        <ul>
          {productos.map(prod => (
              <li key={prod.id}>{prod.nombre} - {prod.precio} - {prod.stockCantidad}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;
