const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

})

//Delete Video
router.delete("/basico", checkAuth, async (req, res) =>{

})

//Update Video
router.put("/basico", checkAuth, async (req, res) =>{

})



module.exports = router;
