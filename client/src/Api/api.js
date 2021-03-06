import { useEffect, useState } from "react";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Api(){

    const navegacion = useNavigate();
    
    //FUNCTION AUTHENTICATE FORM PAGE
    function ApiForm(SetCargando){
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
        
    }



    //AUTHENTICATE LISTING PAGE FUNCTION
    function ApiList(SetCargando){

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


    }


    //REGISTER USER FUNCTION
    function ApiRegister(e,SetInputs,inputs){

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



    //FUNCTION OF AUTHENTICATING USER EXISTENCE
    function ApiLogin(e,SetInputs,inputs){

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




    //FUNCTION TO UPDATE AN EXPENSE
    function ApiUpdate(e,CambiarValorInput,SetDataAut,dataUpdate,valor){

        e.preventDefault();
        const http = new XMLHttpRequest();
        http.onload = function(){
        const data = this.responseText;
        const response = JSON.parse(data);
        if(response){        
        toast.success("Successfully updated");
        CambiarValorInput({concepto:"",monto:"",fecha:"",tipo:""});
        SetDataAut(false);
        setTimeout(()=>{navegacion("/")},2300)
        }else{
        toast.error("It is necessary to fill all the fields");
        }}
        http.open("PUT","http://localhost:4000/api/update");
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        http.send(`id=${dataUpdate.id}&concepto=${valor.concepto}&monto=${valor.monto}&fecha=${valor.fecha}&tipo=${valor.tipo}`);

        }



    //DELETE AN EXPENDITURE FUNCTION
    function ApiDetele(id){

        const http = new XMLHttpRequest();
        http.onload = async function(){
        const data = this.responseText;
        const response = await JSON.parse(data);
        if(response){
        toast.success("Successfully removed");
        setTimeout(()=>{window.location.reload()},2300);
        }else{
        toast.error("There was a mistake");
        }}
        http.open("DELETE","http://localhost:4000/api/delete");
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send(`id=${id}`)

        }



    //FUNCTION THAT OBTAINS THE USER DATA
    function ApiGetData(){

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

    
    //FUNCTION TO REGISTER OR SAVE A NEW EXPENSE
    function ApiRegisterData(e,valor,CambiarValorInput){

        e.preventDefault();
        const user = localStorage.getItem("user");
        if(!valor.concepto || !valor.monto || !valor.fecha || !valor.tipo){
        toast.error("It is necessary to fill all the fields");
        }else{
        const http = new XMLHttpRequest();
        http.onload = function(){
        const data = this.responseText;
        const response = JSON.parse(data)
        if(response){
        toast.success("Successfully registered");
        CambiarValorInput({concepto:"",monto:"",fecha:"",tipo:""});
        setTimeout(()=>{navegacion("/")},2300)
        }}
        http.open("POST","http://localhost:4000/api/register");
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        http.send(`concepto=${valor.concepto}&monto=${valor.monto}&fecha=${valor.fecha}&tipo=${valor.tipo}&user=${user}`);

        }
    
    }


    return{ApiForm,ApiList,ApiRegister,ApiLogin,ApiUpdate,ApiDetele,ApiGetData,ApiRegisterData};

}

export default Api;