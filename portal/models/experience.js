const mongoose = require("mongoose");


const experienceschema = new mongoose.Schema({
    company:String,
    location:String,
    startDate:{type:Date},  // add required true
    endDate:{type:Date},
    description:String

},{timestamps:true})

module.exports = mongoose.model("Experience",experienceschema);