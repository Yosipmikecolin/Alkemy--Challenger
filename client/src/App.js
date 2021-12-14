import { Fragment, useState } from "react";
import {Route,NavLink,Routes} from "react-router-dom";
import styled from "styled-components";
import Formulario from "./Components/Formulario";
import Login from "./Components/Login";
import Listado from "./Components/Listado";

function App() {


  const [editar,SetEditar] = useState([]);

  return (
    <Fragment>

      <Menu>
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/register"> Register </NavLink>
        <NavLink to="/auth"> Auth </NavLink>
      </Menu>

    <Routes>
      
      <Route path="/" element={<Listado SetEditar={SetEditar}/>}/>
      <Route path="/register" element={<Formulario SetEditar={SetEditar} editar={editar}/>}/>
      <Route path="/auth" element={<Login/>}/>
     
    </Routes>
    
  
    </Fragment>
    
   
  );
}



const Menu = styled.nav`

background-color:#191A19;
padding:20px;
text-align:center;

a.active{
  color:#4622ee;

}


a{
  font-size:18px;
  margin:0px 20px 0px 20px;
  font-weight:bold;
  color:#69DADB;
  transition:500ms ease;


  &:hover{

    color:#4622ee;
  }
}



`;

export default App;
