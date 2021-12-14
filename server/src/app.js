const express = require("express");
const app = express();


//CONFIGURACIONES
app.set("puerto",process.env.PORT || 4000);



//MIDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:false}));




// CONFIGURACIONS DE CABECERAS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  


//RUTAS
app.use("/api",require("./Routers/index"));




//SERVIDOR
app.listen(app.get("puerto"),()=>{

    console.log("ESCUCHANDO EN EL PUERTO: ",app.get("puerto"));
    
})