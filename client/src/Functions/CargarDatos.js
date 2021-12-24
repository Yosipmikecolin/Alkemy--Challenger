import { useState } from "react";

function CargarMas(){

    const [cant,SetCant] = useState(10);
    const [viewButton,SetViewButton] = useState(true);


    function SumCant(data){
    SetCant(cant + 10);
    if(cant >= data.length){SetViewButton(false)}
    }

    return [cant,viewButton,SumCant];
}

export default CargarMas;