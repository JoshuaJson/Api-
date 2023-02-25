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



//REGISTER
router.post("/register", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const active = req.body.active;

    const newUser = {
      name: name,
      email: email,
      password: encryptedPassword,
      // type: type,
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


//LOGIN
router.post("/login", async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    var user = await User.findOne({ userName: userName});

    //if no userName
    if (!user) {
      const response = {
        status: "error",
        error: "Invalid Credentials"
      };
      return res.status(401).json(response);
    }

    var isValid = await bcrypt.compare(password, user.password);

    //if no password
    if (!isValid) {
      const response = {
        status: "error",
        error: "Invalid Credentials"
      };
      return res.status(401).json(response);
    }

    //if userName and userName ok
    if (bcrypt.compareSync(password, user.password)) {
      user.set("password", undefined, { strict: false });

      const token = jwt.sign({ userData: user }, JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 30
      });

      const response = {
        status: "success",
        token: token,
        userData: user
      };

      return res.json(response);
    } else {
      const response = {
        status: "error",
        error: "Invalid Credentials"
      };
      return res.status(401).json(response);
    }
  } catch (error) {
    console.log(error);
  }
});

//DELETE USER
router.delete("/user", checkAuth, async (req, res) => {
  try {
    const userId = req.query.userId;
    const email = req.query.email;

    const result = await User.deleteOne({ _id: userId, email: email });

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

//Update User (active)
router.put("/user", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const email = req.userData.email;
    const active = req.body.active;
    const result = await User.updateOne(
      { _id: userId, email: email },
      { $set: { active: active} }
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



