const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

//CONFIGURATIONS
app.set("port",process.env.PORT || 4000);
dotenv.config({path:path.join(__dirname+"/.env")});



//MIDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());




//ROUTES
app.use("/api",require("./Routers/routers"));
app.use("/auth",require("./Auth/auth"));




//SERVER
app.listen(app.get("port"),()=>{
    console.log("LISTENING IN THE PORT: ",app.get("port"));
})