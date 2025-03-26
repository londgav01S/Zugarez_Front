import {useState} from "react";
import {CrudProducto} from "../Components/PedidoProveedor/CrudProducto";
import {ProductList} from "../Components/PedidoProveedor/ProductList";
import "./AppUI.css";
import {UpdateProduct} from "../Components/PedidoProveedor/UpdateProduct";
import InventarioView from "../Components/Inventario/InventarioView";
import DestalleInventarioView from "../Modals/FormularioInventario/DestalleInventarioView";
import {Path} from "../Services/Path";

function AppUI() {
    return(
        <>
            <div className={"containerPadre"}>
                <Path/>
            </div>
        </>
    );
}

export {AppUI};
