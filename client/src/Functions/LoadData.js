import { useState } from "react";

function LoadData(){

    /*This function returns 3 values, the first is the number of elements that should be displayed in the table,
     the second is the button view and the third is the function that is responsible for displaying a balance of 10 expenses */


    const [cant,SetCant] = useState(10);
    const [viewButton,SetViewButton] = useState(true);
    function SumCant(data){
    SetCant(cant + 10);
    if(cant >= data.length){SetViewButton(false)}
    }

    return [cant,viewButton,SumCant];
}

export default LoadData;