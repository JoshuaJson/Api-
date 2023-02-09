const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const basicoSchema = new Schema({
    description:{type: String,},
    name:{type:String,},
    video: {type: Array, default: []}
});

const Basico = mongoose.model("Basico", basicoSchema);

module.exports = Basico;