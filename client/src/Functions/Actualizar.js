import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Actualizar(){

    const navegacion = useNavigate();

    function UpdateBudget(e,CambiarValorInput,SetDataAut,dataAut,valor){
        e.preventDefault();
        const http = new XMLHttpRequest();
        http.onload = function(){
        const data = this.responseText;
        const response = JSON.parse(data);
        if(response){        
        toast.success("Actualizado con exito");
        CambiarValorInput({concepto:"",monto:"",fecha:"",tipo:""});
        SetDataAut(false);
        setTimeout(()=>{navegacion("/")},2300)
        }else{
        toast.error("Los campos no pueden estar vacios");
        }}
        http.open("PUT","http://localhost:4000/api/update");
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        http.send(`id=${dataAut.id}&concepto=${valor.concepto}&monto=${valor.monto}&fecha=${valor.fecha}&tipo=${valor.tipo}`);
        }



        return[UpdateBudget];
}


export default Actualizar;