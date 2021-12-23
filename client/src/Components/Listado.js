import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import styled from "styled-components";
import icono_editar from "../Img/icono-editar.png";
import icono_eliminar from "../Img/icono-eliminar.png";
import converter  from 'convert-string-to-number';
import ObtenerDatos from "../Functions/ObtenerDatos";
import {Contexto} from "../Provider/ProvedorDatos";
import {toast} from "react-hot-toast";


function Listado({SetEditar}){

    const navegacion = useNavigate();
    const [Ingreso,SetIngreso] = useState(0);
    const [Egreso,SetEgreso] = useState(0);
    const [cargando,SetCargando] = useState(false);
    const [data] = ObtenerDatos();
    const {SetDataAut} = useContext(Contexto);
    const [cant,SetCant] = useState(10);
    const [viewButton,SetViewButton] = useState(true);
    const [inputFilter,SetInputFilter] = useState("");


    
    //AUTHENTICATE USER
      useEffect(()=>{
    
      const token = localStorage.getItem("token");
      const http = new XMLHttpRequest();
      http.onload = async function(){
        
      const data = this.responseText;
      const response = await JSON.parse(data);
      if(!response){
      window.location.href ="/sign"
      }else{
      SetCargando(true);
      }}
      http.open("GET","http://localhost:4000/auth/");
      http.setRequestHeader("autorizaciontoken", `${token}`);
      http.send();
     
    },[]);





    //ELIMINAR REGISTRO
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



      function CargarMas(){
      SetCant(cant + 5);
      if(data.length === cant+5){SetViewButton(false)}
      }



      function Editar(id,concepto,monto,fecha,tipo){
      SetDataAut({id:id,concepto:concepto,monto:monto,fecha:fecha,tipo:tipo});
      navegacion("/register");
      }



    //RECORRER LOS INGRESOS
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

      useEffect(()=>{

        const co = ['red', 'almorzar con mi novia', 'blue', 'white'].includes(inputFilter);
        console.log(co)


      },[inputFilter]);





    return(

        cargando &&
        <Contenedor>
          {data.length ?
            <Fragment>
              <InputFilter type="text" placeholder="Filtrar un gasto" onChange={(e)=>{SetInputFilter(e.target.value)}}/>
    <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Concepto</th>
      <th scope="col">Monto</th>
      <th scope="col">Fecha</th>
      <th scope="col">Tipo</th>
      <th scope="col">Modificar</th>
      <th scope="col">Eliminar</th>
    </tr>
  </thead>
  <tbody>

    {data.slice(0,cant).map((item,index)=>{

      return(



        <tr key={item.Id}>
          <th data-titulo="#" scope="row">{index+1}</th>
          <td data-titulo="concepto">{item.Concepto}</td>
          <td data-titulo="monto">{item.Monto}</td>
          <td data-titulo="fecha">{item.Fecha}</td>
          <td data-titulo="tipo">{item.Tipo}</td>
          <td data-titulo="editar"><IconoEdit src={icono_editar} onClick={()=>{Editar(item.Id,item.Concepto,item.Monto,item.Fecha,item.Tipo)}} width="20" alt="editar"/></td>
          <td data-titulo="eliminar"><IconoDelete onClick={()=>{Eliminar(item.Id)}} src={icono_eliminar} width="20" alt="editar"/></td>
       </tr>

      
     
  
      );
    })}
    
    
  </tbody>
</table>
{viewButton &&  <BotonCargar onClick={CargarMas}>Cargar mas</BotonCargar>}
  
  <h1>Total de Ingreso: {!Ingreso ? 0 : parseFloat(Ingreso).toFixed(3)}</h1>
  <h1>Total de Egreso: {!Egreso ? 0 : parseFloat(Egreso).toFixed(3)}</h1>
  </Fragment>
: <h1>No hay registros</h1>}
</Contenedor>

        
    );
}



const Contenedor = styled.div`
width:900px;
margin-left:auto;
margin-right:auto;
margin-top:100px;
text-align:center;

@media(max-width:1000px){
  width:100%;
}

@media(max-width:600px){

  table{
    width:100%;
    
  }

  table td[data-titulo]{
    text-align:left;
  }

table td[data-titulo]::before{
  content: attr(data-titulo);
  margin-right:5px;
  color:#69DADB;
  font-weight:bold;
}

  table tr{

    display:flex;
    flex-direction:column;
    border:2px solid #1F1D36;
    border-radius:5px;
    padding:1em;
    margin:10px;
    margin-bottom:1em;
    background-color:#191A19;
    color:#fff;
    
  }

  table td{

    border:none;
    background:none !important;
  }

  table thead{

    display:none;
    
  }

}

`;

const IconoEdit = styled.img`
cursor:pointer;
`;

const IconoDelete = styled.img`
cursor:pointer;
`;

const BotonCargar = styled.button`

border:none;
border-radius:5px;
padding:10px 20px;
background-color:#519259;
color:#fff;
transition:500ms;

&:hover{
  background-color:#064635;
}
`;


const InputFilter = styled.input`
width:400px;
border:none;
border-radius:5px;
background-color:#FFBD35;
padding:20px;

`;

export default Listado;