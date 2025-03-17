import React, {useRef, useState} from "react";

const ApiContext = React.createContext();

function ApiProvider({ children }) {
    const [productos, setProductos] = useState([]);

    return (
        <ApiContext.Provider value={{
            productos,
            setProductos
        }}>
            {children}
        </ApiContext.Provider>
    );
}

export { ApiContext, ApiProvider };