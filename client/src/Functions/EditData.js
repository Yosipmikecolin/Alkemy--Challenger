import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {Contexto} from "../Provider/ProvedorDatos";

function EditData(){

    /*I receive the data that I want to edit and I pass it to a global state,
     then I redirect it to the form screen where it will verify the value of the state (dataUpdate)
     to know if a data must be updated or not. */


    const {SetDataUpdate} = useContext(Contexto);
    const navegacion = useNavigate();

    function Editar(id,concepto,monto,fecha,tipo){
    SetDataUpdate({id:id,concepto:concepto,monto:monto,fecha:fecha,tipo:tipo});
    navegacion("/register");
    }
  
    return[Editar]

}


export default EditData;