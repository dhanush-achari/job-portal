const mongoose = require("mongoose");

const educationschema = new mongoose.Schema({
    institute:String,
    degree:String,
    startyear:{type:Date,require:true},
    endyear:{type:Date},
    description:String
});

module.exports = mongoose.model("Education",educationschema);