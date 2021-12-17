const {Router} = require("express");
const router = Router();
const mysqlConection = require("../Database/data");
const jwt = require("jsonwebtoken");






//VARIABLES GLOBALES
var usuario = "";
var email = "";
var password = "";



//GET BUDGET -------------------
router.get("/", (req,res)=>{
    
    mysqlConection.query(`SELECT Id, Concepto, Monto, Fecha, Tipo FROM registro`, function (error, rows) {
 
     if (error){
 
      res.status(400);
      throw error;
     
     }else{
 
      res.json(rows).status(200);
    
      
      }  
         
         });  
     });



//CREATE A BUDGET ----------------
router.post("/register",(req,res,next)=>{

     mysqlConection.query(`INSERT INTO registro VALUES (NULL,'${req.body.concepto}','${req.body.monto}','${req.body.fecha}','${req.body.tipo}')`,(e,result)=>{

        if(e){

            res.json("ERROR WHEN REGISTERING",e);

        }else{

            res.json({"status":"200"});
            next();
        }

    });

});



//UPDATE BUDGET ----------------
router.put("/update",(req,res,next)=>{

    mysqlConection.query(`UPDATE registro SET Concepto='${req.body.concepto}',Monto='${req.body.monto}',Fecha='${req.body.fecha}',Tipo='${req.body.tipo}' WHERE Id = '${req.body.id}'`,(e,result)=>{
     
    if(e){

      res.json("ERROR WHEN REGISTERING: ",e);

    }else{

     res.json({"status":"200"});
     next();

    }
        });
    
    });



//DELETE BUDGET ----------------
router.delete("/delete",(req,res,next)=>{

    mysqlConection.query(`DELETE FROM registro WHERE Id = ${req.query.id}`,(e,result)=>{

    if(e){
     res.json("HUBO UN ERROR:",e);
     res.statusCode(500);

    }else{

     res.json({"status":"200"});
     next();

    }
        });
       
    });



router.get("/auth",ValidateToken,(req,res)=>{

      res.json(true);
    
});
    



router.post("/sign_up",(req,res)=>{

   
    const {username,email,password} = req.body;
   
    mysqlConection.query(`INSERT INTO usuarios VALUES (null,'${username}','${email}','${password}') `,async (err,rows)=>{

        if(err){

           res.json(err);

        }else{
           
            const accessToken = generaAccesToken(email);
            res.header("autorizacionToken",accessToken).json({
                user:rows[0].Username,
                token:accessToken
            });
           
            
        }

    });

});



router.post("/sign_in",async (req,res)=>{
    
    const {email,password} = req.body;
    //encryPassword = await bcrypt.hashSync(password,8);
    mysqlConection.query(`SELECT Username FROM usuarios WHERE Password ='${password}' AND Email = '${email}'`,async (err,rows)=>{

        if(err){

            res.json(err);

        }else{
            
           if(rows.length){

              const accessToken = generaAccesToken(email);
              res.header("autorizacionToken",accessToken).json({
              user:rows[0].Username,
              token:accessToken

              });

           }else{

            res.json(false);

           }
     
        }

    });

});


//FUNCTION JWS
function generaAccesToken(email){

    const usuario = {email:email}
    return jwt.sign(usuario,process.env.HASH,{expiresIn:"1m"})

}


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

         res.json(true);
         next();

        }
        });
    }
}




router.get("/sign_out",(req,res,next)=>{


     usuario = "";
     email = "";
     password = "";
     encryPassword = "";
     res.send(true);
     next();

});










module.exports = router;