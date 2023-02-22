const express = require("express");
const router = express.Router();


//Models import
const { checkAuth } = require("../middlewares/authentication.js");
const Intermedio = require("../models/intermedio.js");


//CONSTS
const JWT_SECRET = process.env.JWT_SECRET;


//******************
//**** A P I *******
//******************

//post Video
router.post("/intermedio", checkAuth, async (req, res) =>{
    try {

        var newIntermedio = req.body.Intermedio;

        newIntermedio.createdTime = Date.now();
    
        const r = await Intermedio.create(newIntermedio);
    
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


module.exports = router;