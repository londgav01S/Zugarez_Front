import logo from '../logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import {ApiProvider} from "../Context/ApiContext";
import {AppUI} from "./AppUI";
import InventarioView from "../Components/Inventario/InventarioView";
import DestalleInventarioView from "../Modals/FormularioInventario/DestalleInventarioView";
import {Producto} from "../Components/PedidoProveedor/Producto";
import {Path} from "../Services/Path";



function App() {


  return (
      <Router>

        <ApiProvider>
            <AppUI />
        </ApiProvider>
      </Router>
  );
}

export default App;
