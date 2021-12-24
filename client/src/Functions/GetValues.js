import { useState } from "react";

function GetValues(){

    const [valor,CambiarValorInput] = useState({concepto:"",monto:"",fecha:"",tipo:""});

    function onChangeValue(e){
    const {name,value} = e.target;
    if(name === "monto"){
    CambiarValorInput({...valor,[name]:value.replace(/[^0-9.]/g, "")});
    }else{
    CambiarValorInput({...valor,[name]:value});
    }
    }

   return [valor,CambiarValorInput,onChangeValue];

}

export default GetValues;