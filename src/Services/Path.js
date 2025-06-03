import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import InventarioView from "../Components/Inventario/InventarioView";
import {Producto} from "../Components/PedidoProveedor/Producto";
import DestalleInventarioView from "../Modals/FormularioInventario/DestalleInventarioView";
import RegistrarDesecho from "../Components/Inventario/RegistrarDesecho";
import RegistrarPlanAbastecimiento from "../Components/Inventario/RegistrarPlanAbastecimiento";
import AlertaProductosPorVencer from "../Components/Inventario/AlertaProductosPorVencer";
import RegistrarPedidoProveedor from "../Components/Inventario/RegistrarPedidoProveedor";
import HistorialPedidosProveedor from "../Components/Inventario/HistorialPedidosProveedor";
import RegistrarRecepcionPedido from "../Components/PedidoProveedor/RegistrarRecepcionPedido";
import ResumenMovimientosProducto from "../Components/PedidoProveedor/ResumenMovimientosProducto";
import ProductosCaducadosPorFecha from "../Components/PedidoProveedor/ProductosCaducadosPorFecha";
import VerificarInventario from "../Components/Inventario/VerificarInventario";


function Path() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/inventario"} replace/>}/>
            <Route path="/inventario" element={<InventarioView/>}/>
            <Route path="/inventario/detalle" element={<DestalleInventarioView/>}/>
            <Route path={"/producto"} element={<Producto/>}/>
            <Route path="/caducados" element={<ProductosCaducadosPorFecha />} />
            <Route path="/verificacion" element={<VerificarInventario inventarioId={"681d4b3cd333483c32c50048"} />} />
            <Route path="/desecho" element={<RegistrarDesecho />} />
            <Route path="/por-vencer" element={<AlertaProductosPorVencer />} />
            <Route path="/plan" element={<RegistrarPlanAbastecimiento />} />
            <Route path="/pedido" element={<RegistrarPedidoProveedor />} />
            <Route path="/historial-pedidos" element={<HistorialPedidosProveedor />} />
            <Route path="/recepcion" element={<RegistrarRecepcionPedido />} />
            <Route path="/resumen" element={<ResumenMovimientosProducto />} />
        </Routes>
    );
}

export {Path}