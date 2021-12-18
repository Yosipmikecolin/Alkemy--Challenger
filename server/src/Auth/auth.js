const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysqlConection = require("../Database/data");
  
  



//SIGN UP
router.post("/sign_up",(req,res)=>{

  const {username,email,password} = req.body;
  const passwordCry = bcrypt.hashSync(password,8);
  mysqlConection.query(`INSERT INTO usuarios VALUES (null,'${username}','${email}','${passwordCry}') `,async (err,rows)=>{

  if(err){

  res.json(err);

  }else{    
  const accessToken = generaAccesToken(email);
  res.header("autorizacionToken",accessToken).json({
  user:username,
  token:accessToken

  });
  }})});

  



//SIGN IN
router.post("/sign_in",(req,res)=>{
  
  const {email,password} = req.body;
  mysqlConection.query(`SELECT Username,Password FROM usuarios WHERE Email = '${email}'`,async (err,rows)=>{
  if(err){
  res.json(err);    
  }else{
          
  const match = bcrypt.compareSync(password,rows[0].Password);
  if(rows.length && match){

  const accessToken = generaAccesToken(email);
  res.header("autorizacionToken",accessToken).json({
  user:rows[0].Username,
  token:accessToken

  });

  }else{
  res.json(false);
  }}})});






//SIGN OFF
router.get("/sign_out",(req,res,next)=>{

   usuario = "";
   email = "";
   password = "";
   encryPassword = "";
   res.send(true);
   next();

});





  //*******  AUTHENTICATION WITH JWS  ******//


//VALIDATION TOKEN
router.get("/",ValidateToken,(req,res)=>{

  res.json(true);

});


//FUNCTION VALIDATE TOKEN
function ValidateToken(req,res,next){

const accessToken = req.headers;
if(!accessToken["autorizaciontoken"]){
res.json("No hay token"); 
}else{
jwt.verify(accessToken["autorizaciontoken"],process.env.HASH,(e,user)=>{
if(e){
res.json(false);
}else{
next();
}
});
}
}




//FUNCTION JWS
function generaAccesToken(email){
const usuario = {email:email}
return jwt.sign(usuario,process.env.HASH,{expiresIn:"2d"})
}



module.exports = router;