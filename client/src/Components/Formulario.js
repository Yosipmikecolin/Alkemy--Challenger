import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import styled from "styled-components";
import {Contexto} from "../Provider/ProvedorDatos";
import {toast} from "react-hot-toast";

function Formulario(){

    const navegacion = useNavigate();
    const [valor,CambiarValorInput] = useState({concepto:"",monto:"",fecha:"",tipo:""});
    const [cargando,SetCargando] = useState(false);
    const {dataAut,SetDataAut} = useContext(Contexto);



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
    if(dataAut){CambiarValorInput(dataAut)}


    },[dataAut]);




    //UPDATE BUDGET
    function UpdateBudget(e){
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




    //REGISTER BUDGET
    function RegisterBudget(e){
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





    //GET INPUT VALUES
    function ObtenerValores(e){
    const {name,value} = e.target;
    if(name === "monto"){
    CambiarValorInput({...valor,[name]:value.replace(/[^0-9.]/g, "")});
    }else{
    CambiarValorInput({...valor,[name]:value});
    }
    }




    
    return(
    cargando &&
    <Fragment> 

    <Form onSubmit={ dataAut ? UpdateBudget : RegisterBudget}>
    <h2>{dataAut ? "Edit record" : "Registration"}</h2> 
    <Input type="text" placeholder="Concepto" name="concepto" value={valor.concepto} onChange={(e)=>{ObtenerValores(e)}}required/>
    <Input type="text" placeholder="5.400" name="monto" value={valor.monto}  onChange={(e)=>{ObtenerValores(e)}}  required/>
    <Input type="date" placeholder="Fecha" name="fecha" value={valor.fecha}  onChange={(e)=>{ObtenerValores(e)}} required/>
    {dataAut.id &&  <InputId type="text" name="id" defaultValue={dataAut.id} />}
    <Select name="tipo" onChange={(e)=>{ObtenerValores(e)}}>
    {dataAut ?  
    <option value={dataAut.tipo}>{dataAut.tipo}</option> : 
    <Fragment>
    <option value="">Select option</option>
    <option  value="ingreso">Ingreso</option>
    <option  value="egreso">egreso</option>
    </Fragment>}     
    </Select>
    <Boton>{dataAut ? "Actualizar registro" : "registrar operacion"}</Boton> 
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


&:hover{
   
    background-color: #12bebf;
}
`;
export default Formulario;