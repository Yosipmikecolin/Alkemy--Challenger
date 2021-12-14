const mysql = require("mysql");

const mysqlConection = mysql.createConnection({

    host:  "localhost",
    user:"root",
    password:"",
    database:"gastos"


});


mysqlConection.connect((e)=>{

    if(e){

        console.log("Hubo un error: ",e);
        return;
        
    }else{

        console.log("CONECTADO A LA BASE DE DATOS");
       
    }


});

module.exports = mysqlConection;