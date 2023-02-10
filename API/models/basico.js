const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const basicoSchema = new Schema({
    description:{type: String, require:[true]},
    name:{type:String,require:[true] },
    video: {type: Array, default: []}
});

const Basico = mongoose.model("Basico", basicoSchema);

module.exports = Basico;