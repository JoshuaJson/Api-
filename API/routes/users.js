const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkAuth } = require("../middlewares/authentication.js");

require("dotenv").config();


//models import
const User = require("../models/user.js");

//CONSTS
const JWT_SECRET = process.env.JWT_SECRET;


router.get("/testing", (req, res) => {
  res.send("Hello IoT GL API from devices.js");
});

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const name = req.body.name;
    // const email = req.body.email;
    const password = req.body.password;
    // const type = req.body.type;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const userId = req.body.userId;
    const active = req.body.active;

    const newUser = {
      name: name,
      // email: email,
      password: encryptedPassword,
      type: type,
      userId: userId,
      active: active
    };

    var user = await User.create(newUser);

    await User.updateOne(
      { _id: user._id, type: "admin" },
      { $set: { userId: user._id } }
    );

    const response = {
      status: "success"
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("ERROR - REGISTER ENDPOINT");
    console.log(error);

    const response = {
      status: "error",
      error: error
    };

    console.log(response);

    return res.status(500).json(response);
  }
});











module.exports = router;



