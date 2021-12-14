const {Router} = require("express");
const router = Router();
const mysqlConection = require("../Database/data");



//VARIABLES GLOBALES
var usuario = "";
var email = "";
var password = "";



router.get("/get_data", (req,res)=>{
    

mysqlConection.query(`SELECT Id, Concepto, Monto, Fecha, Tipo FROM registro LIMIT 0,${req.query.indice}`, function (error, rows, fields) {

    if (error){

     throw error;

    }else{

     res.json(rows);
     //console.log();

     }  
        
        });  
    });



router.post("/register",async (req,res,next)=>{

   
    usuario = req.body.username;
    email = req.body.email;
    password = req.body.password;
   
    mysqlConection.query(`INSERT INTO usuarios VALUES (null,'${usuario}','${email}','${password}') `,async (err,result)=>{


        if(err){

           
            console.log(err);

        }else{
           
            res.redirect("http://localhost:3000/");
            next();
        }

    });

});


router.post("/login",async (req,res,next)=>{

   
    
    email = req.body.email;
    password = req.body.password;
    //encryPassword = await bcrypt.hashSync(password,8);
    mysqlConection.query(`SELECT Username FROM usuarios WHERE Password ='${password}'`,async (err,rows,result)=>{

        if(err){

            console.log(err);

        }else{
            
            
            if(rows[0]){

                res.redirect("http://localhost:3000/");
                usuario = rows[0].Username;
                next();

            }else{

                res.redirect("http://localhost:3000/auth");
                next();
            }
          
     
        }

    });

});






router.post("/register_operaction",(req,res,next)=>{

    mysqlConection.query(`INSERT INTO registro VALUES (NULL,'${req.body.concepto}','${req.body.monto}','${req.body.fecha}','${req.body.tipo}')`,(e,result)=>{


        if(e){

            console.log(e);
            res.json("ERROR AL AL REGISTRAR: ",e);
        }else{

            res.redirect("http://localhost:3000/");
            next();
        }


    });


});



router.post("/update_operaction",(req,res,next)=>{

    mysqlConection.query(`UPDATE registro SET Concepto='${req.body.concepto}',Monto='${req.body.monto}',Fecha='${req.body.fecha}',Tipo='${req.body.tipo}' WHERE Id = '${req.body.id}'`,(e,result)=>{


        if(e){

            console.log(e);
            res.json("ERROR AL AL REGISTRAR: ",e);
        }else{

            res.redirect("http://localhost:3000/");
            next();
        }


    });


});



router.get("/auth",(req,res)=>{

    if(usuario === "" || email === ""){

        res.json(false);

    }else{

        res.json({"user":usuario,"email":email});
       
    }

});





router.get("/auth/close",(req,res,next)=>{


     usuario = "";
     email = "";
     password = "";
     encryPassword = "";
     res.send(true);
     next();

});


router.post("/delete",(req,res,next)=>{

    
    mysqlConection.query(`DELETE FROM registro WHERE Id = ${req.body.id}`,(e,result)=>{

        if(e){

            res.json("HUBO UN ERROR:",e);
            res.statusCode(500);
        }else{

            res.json(true);
            next();
        }

    });
   

});







module.exports = router;