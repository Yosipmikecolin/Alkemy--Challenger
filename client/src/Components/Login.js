import { Fragment,useState } from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";

function Login(){


    const [sesion,SetSesion] = useState(false);
    const navegacion = useNavigate();
    const [inputs,SetInputs] = useState({username:"",email:"",password:""});
    
  
  

    //GET INPUT VALUES
    function OnchangeInputs(e){
    const {name,value} = e.target;
    SetInputs({...inputs,[name]:value});
    }



    //REGISTER USER
    function RegisterUser(e){
    e.preventDefault();
    const http = new XMLHttpRequest();
    http.onload = async function(){
    const data = this.responseText;
    const response = await JSON.parse(data);
    localStorage.setItem("user",response.user);
    localStorage.setItem("token",response.token);
    SetInputs({username:"",email:"",password:""});
    toast.success('Welcome '+response.user,{icon:'👏',duration:2500});
    setTimeout(()=>{
    navegacion("/");
    },2500)}

    http.open("POST","http://localhost:4000/auth/sign_up");
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(`username=${inputs.username}&email=${inputs.email}&password=${inputs.password}`); 
    }


    //USER LOGIN
    function LogIn(e){

    e.preventDefault();
    const http = new XMLHttpRequest();
    http.onload = async function(){
    const data = this.responseText;
    const response = await JSON.parse(data);    
    if(response.token){
    localStorage.setItem("token",response.token);
    localStorage.setItem("user",response.user);
    SetInputs({username:"",email:"",password:""});
    toast.success('Welcome '+response.user,{icon:'👏',duration:2500});      
    setTimeout(()=>{
    navegacion("/");
    },2500);
    }else{          
    toast.error("The username or password is incorrect")
    }}

    http.open("POST","http://localhost:4000/auth/sign_in");
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.send(`email=${inputs.email}&password=${inputs.password}`);
    }


    return(
    <Fragment>  
    <Form onSubmit={ sesion ? RegisterUser : LogIn} method="POST">
    <h1>{sesion ? "Register user" : "Log in"}</h1>
    <InputUser type="text" placeholder="Username" visual={sesion}  name="username" value={inputs.username} onChange={OnchangeInputs}/>
    <Input type="email" placeholder="Email" name="email" required value={inputs.email} onChange={OnchangeInputs}/>
    <Input type="password" placeholder="Password" name="password"required value={inputs.password} onChange={OnchangeInputs}/>
    <Boton>{sesion ? "Register user" : "Log in"}</Boton>
    <Span>{sesion ? "¿You already have an account? " : "¿Are you a new user? "}<p onClick={()=>{SetSesion(!sesion)}}>{sesion ? "Log in" : "Create an account"}</p></Span>
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
    padding:10px;
    }
    `;



    const Span = styled.span`
    color:#fff;
    font-size:14px;
    display:inline;
    p{
    color:#12bebf;
    font-size:16px;
    font-weight:bold;
    display:inline;
    cursor:pointer;
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


    const InputUser = styled.input`
    background:#fff;
    display:${prop => prop.visual ? "block;" : "none;"}
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

export default Login;