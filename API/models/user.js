
const mongoose = require("mongoose");
const  uniqueValidator = require("mongoose-unique-validator");
//const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, require: [true]},
    password: {type: String, require:[true]},
    userName: { type: String },
    userId: { type: String },
     email: {
         type: String,
         required: [true],
         unique: [true],
         lowercase: [true],
         index: [true],
       },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },

});


//Validator
userSchema.plugin(uniqueValidator, { message: "Error, email already exists." });

// convert to model
const User = mongoose.model("User", userSchema);

module.exports = User;

