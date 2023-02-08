const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const avanzadoSchema = new Schema({
    description:{type: String,},
    name:{type:String,},
    video: {type: Array, default: []}
});

const Avanzado = mongoose.model("Avanzado", avanzadoSchema);

module.exports = Avanzado;