const mysql = require("mysql");

const mysqlConection = mysql.createConnection({

    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE

});

mysqlConection.connect((e)=> {

    if(e){
    console.log("THERE WAS A MISTAKE: ",e);
    return; 
    }else{
    console.log("CONNECTED TO THE DATABASE");
    }
});


module.exports = mysqlConection;