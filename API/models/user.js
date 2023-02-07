import mongoose from "mongoose";
const  uniqueValidaitor = requiere("mongoose-unique-validator");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, require: [true]},
    password: {type: String, require:[true]},
    userId: { type: String },
    email: {
        type: String,
        required: [true],
        unique: [true],
        lowercase: [true],
        index: [true],
      },
    createdAt: { type: Date, default: Date.now },

})


//Validator
UserSchema.plugin(uniqueValidator, { message: "Error, email already exists." });

// convert to model
const User = mongoose.model("User", userSchema);

export default User;
