import { createContext, useState } from "react";

const Contexto = createContext();

function ProvedorDatos({children}){

    const [dataUpdate,SetDataUpdate] = useState(false);
    const [texto,SetTexto] = useState("Sign");


    return(
        <Contexto.Provider value={{dataUpdate,SetDataUpdate,texto,SetTexto}}>
            {children}
        </Contexto.Provider>
    );

}


export {Contexto,ProvedorDatos};