import { useEffect, useState } from "react";
import converter  from 'convert-string-to-number';

function Balance(data){


    /*The balance function goes through all the expenses and adds the income and
     expenses and returns them in some variables */


    const [Ingreso,SetIngreso] = useState(0);
    const [Egreso,SetEgreso] = useState(0);

    useEffect(()=>{
    var ingreso  = 0;
    var egreso  = 0;
    data.forEach((item)=>{
    if(item.Tipo === "ingreso"){
    ingreso += converter(item.Monto);
    SetIngreso(ingreso);
    }else if(item.Tipo === "egreso"){
    egreso += converter(item.Monto);
    SetEgreso(egreso);  
    }});
    },[data]);
    
    return[Ingreso,Egreso];

}


export default Balance;