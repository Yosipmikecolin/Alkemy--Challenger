import { Fragment, useState } from "react";
import {Route,NavLink,Routes} from "react-router-dom";
import styled from "styled-components";
import Formulario from "./Components/Formulario";
import Login from "./Components/Login";
import Listado from "./Components/Listado";
import {Toaster} from "react-hot-toast";
import IconoMenu from "./Img/icono-menu.png";
import IconoCerrar from "./Img/icono-cerrar.png";


function App() {


  const [editar,SetEditar] = useState([]);
  const [menu,SetMenu] = useState(false);

  
  //SHOW MOBILE MENU
  function ShowMenu(){
  document.getElementsByClassName("menuMobil")[0].style.top="0px";
  SetMenu(true);
  }


  //HIDE MOBILE MENU
  function HideMenu(){
  document.getElementsByClassName("menuMobil")[0].style.top="-800px";
  SetMenu(false);
  }



  return (
  <Fragment>
  <Toaster/>
  <Menu>
  <NavLink to="/"> Home </NavLink>
  <NavLink to="/register"> Register </NavLink>
  <NavLink to="/sign" >Sign</NavLink>
  <Img src={menu ? IconoCerrar : IconoMenu} width="30px" alt="icono menu"onClick={menu ? HideMenu : ShowMenu} />
  <MenuMobil className="menuMobil" onClick={HideMenu}>
  <NavLink to="/"> Home </NavLink>
  <NavLink to="/register"> Register </NavLink>
  <NavLink to="/sign"> Sign </NavLink>
  </MenuMobil>
  </Menu>

  <Routes>
  <Route path="/" element={<Listado SetEditar={SetEditar}/>}/>
  <Route path="/register" element={<Formulario SetEditar={SetEditar} editar={editar}/>}/>
  <Route path="/sign" element={<Login/>}/>
  </Routes>
  </Fragment>
  
  );
}



const Menu = styled.nav`
  background-color:#191A19;
  padding:20px;
  text-align:center;
  @media (max-width:450px){
  display:flex;
  justify-content:flex-end;
  > a{
  display:none;
  }}
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
  }}
`;


const MenuMobil = styled.div`
  width:100%;
  height:800px;
  left:0;
  right:0;
  top:-800px;
  position:absolute;
  background-color:#191A19;
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
  transition:500ms ease;
 
  a{
    font-size:40px;
    margin-top:40px;
   
  }
`;

const Img = styled.img`
cursor:pointer;
z-index:3;
display:none;
@media (max-width:450px){
display:block;
}


`;

export default App;
