import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import InventarioView from "../Components/Inventario/InventarioView";
import {Producto} from "../Components/PedidoProveedor/Producto";
import DestalleInventarioView from "../Modals/FormularioInventario/DestalleInventarioView";



function Path() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/inventario"} replace/>}/>
            <Route path="/inventario" element={<InventarioView/>}/>
            <Route path="/inventario/detalle" element={<DestalleInventarioView/>}/>
            <Route path={"/producto"} element={<Producto/>}/>
        </Routes>
    );
}

export {Path}