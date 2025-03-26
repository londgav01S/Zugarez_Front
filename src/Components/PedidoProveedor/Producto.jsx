import {UpdateProduct} from "./UpdateProduct";
import {ProductList} from "./ProductList";
import DestalleInventarioView from "../../Modals/FormularioInventario/DestalleInventarioView";
import "./CrudProducto.css";
import {CrudProducto} from "./CrudProducto";

function Producto() {

    return(
        <div className={"nose"}>
            <CrudProducto/>
            <UpdateProduct/>
            <ProductList/>
        </div>

    );
}

export {Producto};