const express = require("express");
const router = express.Router();


//Models import
const Avanzado = require("../models/avanzado.js");
const { checkAuth } = require("../middlewares/authentication.js");


//CONSTS
const JWT_SECRET = process.env.JWT_SECRET;


//******************
//**** A P I *******
//******************



module.exports = router;