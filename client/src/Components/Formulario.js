import { Fragment, useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import styled from "styled-components";


function Formulario({editar,SetEditar}){

    const navegacion = useNavigate();
    const [valor,CambiarValorInput] = useState({concepto:"",monto:"",fecha:""});




    //verificar autenticacion
       useEffect(()=>{
        
        const xhttp = new XMLHttpRequest();
        
        xhttp.onload = async function(){

            if(this.response === "false"){

                return navegacion("/auth");
                
            }
        }

        xhttp.open("GET","http://localhost:4000/api/auth");
        xhttp.send();


    },[navegacion]);



    //Obtener valores del input
    function ObtenerValores(e){

        const {name,value} = e.target;

        if(name === "monto"){

            CambiarValorInput({...valor,[name]:value.replace(/[^0-9.]/g, "")});


        }else{

            CambiarValorInput({...valor,[name]:value});
           

        }

    }


    useEffect(()=>{

        if(editar.length){

            CambiarValorInput({concepto:editar[1],monto:editar[2],fecha:editar[3]})

        }


    },[editar]);




    
    return(
        <Fragment>

       
            <Form action={editar.length ? "http://localhost:4000/api/update_operaction" : "http://localhost:4000/api/register_operaction"} method="POST">
            <h2>{editar.length ? "Editar registro" : "Formulario de registro de operación"}</h2>
    
        
            <Input type="text" placeholder="Concepto" name="concepto" value={valor.concepto} onChange={(e)=>{ObtenerValores(e)}} required/>
            <Input type="text" placeholder="5.400" name="monto" value={valor.monto}  onChange={(e)=>{ObtenerValores(e)}}  required/>
            <Input type="date" placeholder="Fecha" name="fecha" value={valor.fecha} required onChange={(e)=>{ObtenerValores(e)}}/>

            {editar[0] &&  <InputId type="text" name="id" defaultValue={editar[0]} />}

            
            <Select name="tipo">

                {editar.length ?  <option value={editar[4]}>{editar[4]}</option> : <Fragment> <option value="ingreso">Ingreso</option> <option value="egreso">egreso</option> </Fragment>}
                
            </Select>
            <Boton>{editar.length ? "Actualizar registro" : "registrar operacion"}</Boton>
          
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


@media(max-width:600px){

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