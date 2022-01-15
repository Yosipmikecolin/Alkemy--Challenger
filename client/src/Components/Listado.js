import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import icono_editar from "../Img/icono-editar.png";
import icono_eliminar from "../Img/icono-eliminar.png";
import InputFilterValue from "../Functions/FiltrarDatos";
import CargarMas from "../Functions/CargarDatos";
import EditarDato from "../Functions/EditarDato";
import Balance from "../Functions/Balance";
import Api from "../Api/api";


function Listado(){

    const [cargando,SetCargando] = useState(false);
    const {ApiList,ApiDetele,ApiGetData} = Api();
    const [data] = ApiGetData();
    const [sugerencias,FunctionFilter] = InputFilterValue();
    const [cant,viewButton,SumCant] = CargarMas();
    const [Editar] = EditarDato();
    const [Ingreso,Egreso] = Balance(data);
   
    
    
 
  
    
    //AUTHENTICATE USER
    useEffect(()=>{
    ApiList(SetCargando);
    },[ApiList])


    

    return(
    cargando &&
    <Contenedor>
    {data.length ?
    <Fragment>
    <InputFilter type="text" placeholder="Filter concept" onChange={(e)=>{FunctionFilter(e.target.value,data)}}/>
    <table className="table table-dark">
    <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Concept</th>
    <th scope="col">Amount</th>
    <th scope="col">Date</th>
    <th scope="col">Type</th>
    <th scope="col">Modify</th>
    <th scope="col">Remove</th>
    </tr>
    </thead>

    <tbody>
    {(sugerencias.length ? sugerencias : data).slice(0,cant).map((item,index)=>{
    return(
    <tr key={item.Id}>
    <td data-titulo="#">{index+1}</td>
    <td data-titulo="Concept">{item.Concepto}</td>
    <td data-titulo="Amount">{item.Monto}</td>
    <td data-titulo="Date">{item.Fecha}</td>
    <td data-titulo="Type">{item.Tipo}</td>
    <td data-titulo="Modify"><IconoEdit src={icono_editar} onClick={()=>{Editar(item.Id,item.Concepto,item.Monto,item.Fecha,item.Tipo)}} width="20" alt="editar"/></td>
    <td data-titulo="Remove"><IconoDelete onClick={()=>{ApiDetele(item.Id)}} src={icono_eliminar} width="20" alt="editar"/></td>
    </tr>
    )})}
    
    
    </tbody>
    </table>
    {viewButton &&  <BotonCargar onClick={()=>{SumCant(data)}}>Load more</BotonCargar>}
  
    <h1>Income: {!Ingreso ? 0 : parseFloat(Ingreso).toFixed(3)}</h1>
    <h1>Expenses: {!Egreso ? 0 : parseFloat(Egreso).toFixed(3)}</h1>
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
    }}
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
    background-color:#191A19;
    color:#fff;
    padding:15px;
    margin-bottom:20px;

    @media(max-width:600px){
    width:300px;
    }
    `;

export default Listado;