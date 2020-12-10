const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name:String,
    role:String,
    description:String,
    startDate:{type:Date,required:true},
    endDate:{type:Date}
},{timestamps:true})


module.exports = mongoose.model("Project",projectSchema);