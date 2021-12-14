import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

function Login(){


    const [sesion,SetSesion] = useState(false);
    const [auth,SetAuth] = useState(false);
    const navegacion = useNavigate();



    function CerrarSesion(){

        const http = new XMLHttpRequest();
        http.onload = function(){

            alert("Sesión cerrada");
            return navegacion("/");
        }

        http.open("GET","http://localhost:4000/api/auth/close");
        http.send();

    }

    
  
    useEffect(()=>{

      const http = new XMLHttpRequest();
      http.onload = async function(){

        if(this.response === "false"){

            SetAuth(false);
           
            
        }else{

            SetAuth(true);

        }
      }

      http.open("GET","http://localhost:4000/api/auth");
      http.send();

    },[auth]);

    return(
     <Fragment>
         {!auth  ?
         
        
         <Form action={sesion ? "http://localhost:4000/api/register" : "http://localhost:4000/api/login"} method="POST">
         <h1>{sesion ? "Registrar nuevo usuario" : "Iniciar sesión"}</h1>

         <InputUser visual={sesion} type="text" placeholder="Username" name="username"/>
         <Input type="email" placeholder="Email" name="email" required/>
         <Input type="password" placeholder="Password" name="password" required/>
         <Boton>{sesion ? "Registrar usuario" : "Iniciar sesión"}</Boton>
         <Span>{sesion ? "¿Ya tienes cuenta? " : "¿Eres un nuevo usuario? "}<p onClick={()=>{SetSesion(!sesion)}}>{sesion ? "Iniciar sesión" : "Crear una cuenta"}</p></Span>
        </Form>
        
        
         : <BotonCerrarSesion onClick={CerrarSesion}>Cerrar sesión</BotonCerrarSesion>}
        
      
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
`;


const BotonCerrarSesion = styled.button`

border:none;
background-color:red;
color:#fff;
padding:15px 40px;
border-radius:5px;
font-family: "Poppins", sans-serif;
font-size:18px;
cursor:pointer;
display:block;
margin-left:auto;
margin-right:auto;
margin-top:200px;
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