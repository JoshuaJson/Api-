const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const intermedioSchema = new Schema({
    description:{type: String,},
    name:{type:String,},
    video: {type: Array, default: []}
});

const Intermedio = mongoose.model("Intermedio", intermedioSchema);

module.exports = Intermedio;

