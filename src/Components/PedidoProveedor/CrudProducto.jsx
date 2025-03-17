import {useState} from "react";
import {registerProduct} from "../../Services/InventarioApiService";
import "./CrudProducto.css";

function CrudProducto() {

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [marca, setMarca] = useState('');
    const [fechaVencimiento, setFechaV] = useState('');
    const [estado, setEstado] = useState("por vencer");
    const handleRegister = () => {
        const producto = {
            nombre,
            precio: parseFloat(precio),
            cantidad: parseInt(cantidad, 10),
            marca,
            fechaVencimiento,
            estado,
        };
        registerProduct(producto).then(r => {});
    };
    const handleClear = () => {
        setNombre("");
        setPrecio("");
        setCantidad("");
        setMarca("");
        setFechaV("");
        setEstado("por vencer");
    }


    return(
        <div className={"container"}>
            <div className={"card"}>
                <a className="crearProducto">Crear Producto</a>
                <div className="inputBox">
                    <span className="nombreProducto">Nombre Producto</span>
                    <input
                        type="text"
                        required="required"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                </div>
                <div className="inputBox">
                    <span>Precio</span>
                    <input
                        type="text"
                        required="required"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />

                </div>
                <div className="inputBox">
                    <span>Cantidad</span>
                    <input
                        type="text"
                        required="required"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                    />

                </div>
                <div className="inputBox">
                    <span>Marca</span>
                    <input
                        type="text"
                        required="required"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                    />

                </div>
                <div className="inputBox">
                    <span>Fecha Vencimiento</span>
                    <input
                        type="date"
                        required="required"
                        value={fechaVencimiento}
                        onChange={(e) => setFechaV(e.target.value)}
                    />

                </div>
                <div className="inputBox">
                    <span>Estado</span>
                    <select className={"selectEstado"} value={estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="por vencer">Por vencer</option>
                        <option value="vencido">Vencido</option>
                        <option value="a tiempo">A tiempo</option>
                    </select>
                </div>
                <button className="enter" onClick={handleRegister}>Registrar Producto</button>
                <button className="enter" onClick={handleClear}>Limpiar Campos</button>

            </div>
        </div>
    );
}

export {CrudProducto};
