import { createContext, useState } from "react";

const Contexto = createContext();

function ProvedorDatos({children}){

    const [dataAut,SetDataAut] = useState(false);


    return(
        <Contexto.Provider value={{dataAut,SetDataAut}}>
            {children}
        </Contexto.Provider>
    );

}


export {Contexto,ProvedorDatos};