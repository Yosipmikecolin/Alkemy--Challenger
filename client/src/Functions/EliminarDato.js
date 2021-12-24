import {toast} from "react-hot-toast";

function EliminarDato(){


    

    function Eliminar(id){

        const http = new XMLHttpRequest();
        http.onload = async function(){
        const data = this.responseText;
        const response = await JSON.parse(data);
        if(response){
        toast.success("Eliminado con exito");
        setTimeout(()=>{window.location.reload()},2300);
        }else{
        toast.error("Hubo un error");
        }}
        http.open("DELETE","http://localhost:4000/api/delete");
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(`id=${id}`)
        }


        return [Eliminar];


}


export default EliminarDato;