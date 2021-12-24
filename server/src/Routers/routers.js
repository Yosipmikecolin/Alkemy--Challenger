const {Router} = require("express");
const router = Router();
const mysqlConection = require("../Database/data");



//GET BUDGET -------------------
router.get("/", (req,res)=>{
    
    const {user} = req.query;
    mysqlConection.query(`SELECT Id, Concepto, Monto, Fecha, Tipo FROM registro WHERE  User = '${user}'`, function (e, rows) {
    if(e){   
    res.json("ERROR"+e);
    }else{
    res.json(rows);
    }});  
    });



//CREATE A BUDGET ----------------
router.post("/register",(req,res)=>{

    mysqlConection.query(`INSERT INTO registro VALUES (NULL,'${req.body.concepto}','${req.body.monto}','${req.body.fecha}','${req.body.tipo}', '${req.body.user}')`,(e,result)=>{
    if(e){
    res.json("ERROR"+e);
    }else{
    res.json(true);
    }
    });

});



//UPDATE BUDGET ----------------
router.put("/update",(req,res)=>{

    const {id,concepto,monto,fecha,tipo} = req.body;
    if(id && concepto && monto && fecha && tipo){

    mysqlConection.query(`UPDATE registro SET Concepto='${req.body.concepto}',Monto='${req.body.monto}',Fecha='${req.body.fecha}',Tipo='${req.body.tipo}' WHERE Id = '${req.body.id}'`,(e,result)=>{
    if(e){
    res.json("ERROR: "+e);
    }else{
    res.json(true);
    }});

    }else{
    res.json(false);
    }
    });



//DELETE BUDGET ----------------
router.delete("/delete",(req,res)=>{

    const id = req.body.id;
    mysqlConection.query(`DELETE FROM registro WHERE Id = ${id}`,(e,result)=>{
    if(e){
    res.json("ERROR:"+e);
    }else{
    res.json(true);
    }});  
    });


  

module.exports = router;