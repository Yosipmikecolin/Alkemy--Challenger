import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {Contexto} from "../Provider/ProvedorDatos";

function EditarDato(){

    const {SetDataUpdate} = useContext(Contexto);
    const navegacion = useNavigate();

    function Editar(id,concepto,monto,fecha,tipo){
    SetDataUpdate({id:id,concepto:concepto,monto:monto,fecha:fecha,tipo:tipo});
    navegacion("/register");
    }
  
    return[Editar]

}


export default EditarDato;