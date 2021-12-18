const {Router} = require("express");
const router = Router();
const mysqlConection = require("../Database/data");



//GET BUDGET -------------------
router.get("/", (req,res)=>{
    
    mysqlConection.query(`SELECT Id, Concepto, Monto, Fecha, Tipo FROM registro`, function (e, rows) {
    if(e){   
    res.json("ERROR"+e);
    }else{
    res.json(rows);
    }});  
    });



//CREATE A BUDGET ----------------
router.post("/register",(req,res,next)=>{

    mysqlConection.query(`INSERT INTO registro VALUES (NULL,'${req.body.concepto}','${req.body.monto}','${req.body.fecha}','${req.body.tipo}')`,(e,result)=>{
    if(e){
    res.json("ERROR"+e);
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
    res.json("ERROR: "+e);
    }else{
    res.json({"status":"200"});
    next();

    }});
    });



//DELETE BUDGET ----------------
router.delete("/delete",(req,res,next)=>{

    const id = req.query.id;
    mysqlConection.query(`DELETE FROM registro WHERE Id = ${id}`,(e,result)=>{
    if(e){
    res.json("ERROR:"+e);
    }else{
    res.json({"status":"200"});
    next();
    }});  
    });


  

module.exports = router;