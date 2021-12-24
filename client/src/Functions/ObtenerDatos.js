import { useState,useEffect } from "react";


function ObtenerDatos(){

    const [data,SetData] = useState([]);
    useEffect(()=>{

    var http = new XMLHttpRequest();
    http.onload =  function(){
    const response =  JSON.parse(this.responseText);
    SetData(response);     
    }
  
    const user = localStorage.getItem("user");
    http.open("GET",`http://localhost:4000/api/?user=${user}`);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();
  
        
    },[]);

    return[data]

}


export default ObtenerDatos;