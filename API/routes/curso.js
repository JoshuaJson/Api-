const express = require("express");
const router = express.Router();


//Models import
const { checkAuth } = require("../middlewares/authentication.js");
const Curso = require("../models/curso");


//CONSTS
const JWT_SECRET = process.env.JWT_SECRET;


//******************
//**** A P I *******
//******************

//post Video
router.post("/curso", checkAuth, async (req, res) =>{
    try {

        var newCurso = req.body.Curso;


    
        const r = await Curso.create(newCurso);
    
        const response = {
          status: "success"
        };
    
        return res.json(response);
      } catch (error) {
        console.log(error);
    
        const response = {
          status: "error",
          error: error
        };
    
        return res.status(500).json(response);
      }

})

router.get("/curso", checkAuth, async (req, res)=>{
try {
  const userId = req.userData.userId;
  var TipoDeVideo=req.body.Tipo;

  //get Cursos
  var Cursos = await Curso.find({ tipoDeVideo: TipoDeVideo});

  const response = {
    status: "success",
    data: Cursos
  };
  return res.json(response);
  
} catch (error) {
  const response = {
    status: "error",
    error: error
  };

  return res.status(500).json(response);
  
}
})

module.exports = router;