const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    description:{type: String,},
    titulo:{type:String, require:[true]},
    tipoDeVideo:{type:String, require:[true]},
    video: {type: Array, default: []}
});

const Curso = mongoose.model("Curso", cursoSchema);

module.exports = Curso;

