import {useState} from "react";
import {CrudProducto} from "../Components/PedidoProveedor/CrudProducto";
import {ProductList} from "../Components/PedidoProveedor/ProductList";
import "./AppUI.css";
import {UpdateProduct} from "../Components/PedidoProveedor/UpdateProduct";

function AppUI() {
    return(
        <>
            <div className={"containerPadre"}>
                <CrudProducto />
                <div className={"nose"}>
                    <UpdateProduct />
                    <ProductList />
                </div>

            </div>
        </>
    );
}

export {AppUI};
