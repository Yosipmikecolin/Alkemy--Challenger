import { Fragment, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {Contexto} from "../Provider/ProvedorDatos";
import GetValues from "../Functions/GetValues";
import Registrar from "../Functions/Registrar";
import Actualizar from "../Functions/Actualizar";

function Formulario(){

    
    const [cargando,SetCargando] = useState(false);
    const {dataUpdate,SetDataUpdate} = useContext(Contexto);
    const [valor,CambiarValorInput,onChangeValue] = GetValues();
    const [RegisterBudget] = Registrar();
    const [UpdateBudget] = Actualizar();



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
    //CHECK IF YOU NEED TO UPDATE
    if(dataUpdate){CambiarValorInput(dataUpdate)}


    },[dataUpdate,CambiarValorInput]);



    
    return(
    cargando &&
    <Fragment> 
    <Form onSubmit={(e)=>{ dataUpdate ? UpdateBudget(e,CambiarValorInput,SetDataUpdate,dataUpdate,valor) : RegisterBudget(e,valor,CambiarValorInput)}}>
    <h2>{dataUpdate ? "Edit record" : "Registration"}</h2> 
    <Input type="text" placeholder="Concepto" name="concepto" value={valor.concepto} onChange={(e)=>{onChangeValue(e)}}required/>
    <Input type="text" placeholder="5.400" name="monto" value={valor.monto}  onChange={(e)=>{onChangeValue(e)}}  required/>
    <Input type="date" placeholder="Fecha" name="fecha" value={valor.fecha}  onChange={(e)=>{onChangeValue(e)}} required/>
    {dataUpdate.id &&  <InputId type="text" name="id" defaultValue={dataUpdate.id} />}
    <Select name="tipo" onChange={(e)=>{onChangeValue(e)}}>
    {dataUpdate ?  
    <option value={dataUpdate.tipo}>{dataUpdate.tipo}</option> : 
    <Fragment>
    <option value="">Select option</option>
    <option  value="ingreso">Ingreso</option>
    <option  value="egreso">egreso</option>
    </Fragment>}     
    </Select>
    <Boton>{dataUpdate ? "Actualizar registro" : "registrar operacion"}</Boton> 
    </Form>  
    </Fragment>
    );
}

    const Form = styled.form`
    background-color:#191A19;
    padding:20px;
    width:400px;
    border-radius:5px;
    margin-left:auto;
    margin-right:auto;
    margin-top:100px;
    text-align:center;
    color:#fff;
    @media(max-width:450px){
    width:100%;
}
`;

    const Input = styled.input`
    background:#fff;
    display:block;
    border:none;
    margin-top:30px;
    width:100%;
    padding:15px;
    border-radius:5px;
    font-family: "Poppins", sans-serif;
    font-size:16px;
`;

    const InputId = styled.input`
    background:#fff;
    display:none;
    border:none;
    margin-top:30px;
    width:100%;
    padding:15px;
    border-radius:5px;
    font-family: "Poppins", sans-serif;
    font-size:16px;
`;

    const Select = styled.select`
    background:#fff;
    display:block;
    border:none;
    margin-top:30px;
    width:100%;
    padding:15px;
    border-radius:5px;
    font-family: "Poppins", sans-serif;
    font-size:16px;
`;

    const Boton = styled.button`
    padding:15px;
    background-color:#4622ee;
    font-family: "Poppins", sans-serif;
    width:100%;
    font-size:18px;
    border:none;
    border-radius:5px;
    margin-top:50px;
    margin-bottom:10px;
    cursor:pointer;
    color:#fff;
    transition:500ms ease;
    &:hover{background-color: #12bebf;}
`;

export default Formulario;