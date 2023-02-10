const express = require("express");
const router = express.Router();


//Models import
const Basico = require("../models/basico.js");
const { checkAuth } = require("../middlewares/authentication.js");


//CONSTS
const JWT_SECRET = process.env.JWT_SECRET;


//******************
//**** A P I *******
//******************

//Get Video
router.get("/basico", checkAuth, async (req, res) =>{

})


//post Video
router.post("/basico", checkAuth, async (req, res) =>{
    try {

        var newBasico = req.body.Basico;

        newBasico.createdTime = Date.now();
    
        const r = await Basico.create(newBasico);
    
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

//Delete Video
router.delete("/basico", checkAuth, async (req, res) =>{

})

//Update Video
router.put("/basico", checkAuth, async (req, res) =>{

})



module.exports = router;
