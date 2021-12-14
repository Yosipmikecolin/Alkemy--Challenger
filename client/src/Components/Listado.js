import { Fragment, useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import styled from "styled-components";
import icono_editar from "../Img/icono-editar.png";
import icono_eliminar from "../Img/icono-eliminar.png";
import converter  from 'convert-string-to-number';


function Listado({SetEditar}){

    const navegacion = useNavigate();
    const [data,SetData] = useState([]);
    const [Ingreso,SetIngreso] = useState(0);
    const [Egreso,SetEgreso] = useState(0);
    const [ultimoIndice,SetUltimoIndice] = useState(10);
   
   


    //ELIMINAR REGISTRO
      function Eliminar(id){

        const http = new XMLHttpRequest();
        http.onload = function(){

          if(this.responseText === "true"){

            window.location.reload();
              
          }

        }

        http.open("POST","http://localhost:4000/api/eliminar");
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(`id=${id}`);

        
      }



      function Editar(id,concepto,monto,fecha,tipo){


        SetEditar([id,concepto,monto,fecha,tipo]);
        navegacion("/register");

      }




    
   //OBTENCION DE LA AUTENTICACION
    useEffect(()=>{
        
        var xhttp = new XMLHttpRequest();
        
        xhttp.onload = async function(){

            if(this.response === "false"){

                return navegacion("/auth");
                
            }
        }

        xhttp.open("GET","http://localhost:4000/api/auth");
        xhttp.send();
        return xhttp = new XMLHttpRequest();

    },[navegacion]);



    //OBTENCION DE REGISTROS PARA LA TABLA
    useEffect(()=>{

      var http = new XMLHttpRequest();
      http.onload =  function(){

       const response =  JSON.parse(this.responseText);
       SetData(response);  
       
      }

      http.open("GET",`http://localhost:4000/api/get_data?indice=${ultimoIndice}`);
      http.setRequestHeader("content-type","text/plain;charset=UTF-8");
      http.send();
      return http = new XMLHttpRequest();
      
      
    },[ultimoIndice]);



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
          
        }
        
      });
       
    },[data]);


   


    function ObtenerMasDatos(){

      SetUltimoIndice(ultimoIndice+10);

    }


    return(

        <Contenedor>
          {data.length ?
             <Fragment>
    <table className="table table-dark table-striped">
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

    {data.map((item,index)=>{

      return(

     

        <tr key={item.Id}>
          <th scope="row">{index+1}</th>
          <td>{item.Concepto}</td>
          <td>{item.Monto}</td>
          <td>{item.Fecha}</td>
          <td>{item.Tipo}</td>
          <td><IconoEdit src={icono_editar} onClick={()=>{Editar(item.Id,item.Concepto,item.Monto,item.Fecha,item.Tipo)}} width="20" alt="editar"/></td>
          <td><IconoDelete onClick={()=>{Eliminar(item.Id)}} src={icono_eliminar} width="20" alt="editar"/></td>
       </tr>
     
  
      );
    })}
    
    
  </tbody>
</table>
<BotonCargar onClick={ObtenerMasDatos}>Cargar mas</BotonCargar>
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

export default Listado;