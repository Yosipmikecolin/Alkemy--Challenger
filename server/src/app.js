const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");


//CONFIGURATIONS
app.set("port",process.env.PORT || 4000);
dotenv.config({path:path.join(__dirname+"/.env")});



//MIDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:false}));




// HEADER CONFIGURATIONS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  


//ROUTES
app.use("/api",require("./Routers/index"));




//SERVER
app.listen(app.get("port"),()=>{

    console.log("LISTENING IN THE PORT: ",app.get("port"));
    
})