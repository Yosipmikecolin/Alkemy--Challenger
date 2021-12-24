import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Registrar(){

    const navegacion = useNavigate();

    function RegisterBudget(e,valor,CambiarValorInput){
        e.preventDefault();
        const user = localStorage.getItem("user");
        if(!valor.concepto || !valor.monto || !valor.fecha || !valor.tipo){
        toast.error("Los campos no pueden estar vacios");
        }else{
        const http = new XMLHttpRequest();
        http.onload = function(){
    
        const data = this.responseText;
        const response = JSON.parse(data)
        if(response){
        toast.success("Registrado con exito");
        CambiarValorInput({concepto:"",monto:"",fecha:"",tipo:""});
        setTimeout(()=>{navegacion("/")},2300)
        }}
        http.open("POST","http://localhost:4000/api/register");
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        http.send(`concepto=${valor.concepto}&monto=${valor.monto}&fecha=${valor.fecha}&tipo=${valor.tipo}&user=${user}`);
        }}


        return[RegisterBudget];


}

export default Registrar;