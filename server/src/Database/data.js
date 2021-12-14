const mysql = require("mysql");

const mysqlConection = mysql.createConnection({

    host:  "localhost",
    user:"root",
    password:"",
    database:"gastos"


});


mysqlConection.connect((e)=>{

    if(e){

        console.log("THERE WAS A MISTAKE: ",e);
        return;
        
    }else{

        console.log("CONNECTED TO THE DATABASE");
       
    }


});

module.exports = mysqlConection;