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
//Get Video
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

//delete video
router.delete("/curso", checkAuth, async (req, res) => {
  try {
    const userId = req.query._id;
    const titulo = req.query.titulo;
    const tipoDeVideo= req.query.tipoDeVideo

    const result = await Curso.deleteOne({ _id: userId, titulo: titulo, tipoDeVideo : tipoDeVideo });

    const response = {
      status: "success"
    };

    return res.json(response);
  } catch (error) {
    console.log("ERROR DELETING USER");
    console.log(error);

    const response = {
      status: "error",
      error: error
    };

    return res.status(500).json(response);
  }
});

//Update video
router.put("/curso", checkAuth, async (req, res) => {
  try {
    const videoId = req.body._id;
    const titulo = req.body.titulo;
    const tipoDeVideo= req.body.tipoDeVideo
    const video = req.body.video
    const result = await Curso.updateOne(
      { _id: videoId, tipoDeVideo: tipoDeVideo},
      { $set: { titulo: titulo , video: video} }
    );

    const response = {
      status: "success"
    };

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;