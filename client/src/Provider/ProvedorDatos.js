import { createContext, useState } from "react";

const Contexto = createContext();

function ProvedorDatos({children}){
const [dataUpdate,SetDataUpdate] = useState(false);
  
return(
<Contexto.Provider value={{dataUpdate,SetDataUpdate}}>
{children}
</Contexto.Provider>
);
}


export {Contexto,ProvedorDatos};