const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
 employerid:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"Employer"
 },
 title:String,
 description:String,
 company:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"Compnay"
 },
 jobType:String,
 address:String,
 skills:{
     type:[String],
     required:true
 },
 startDate:{type:Date,required:true},
 endDate:{type:Date,required:true},
 category:String,
 vacancies:String,
 shift:String,
 city:String,
 salary:String

})


module.exports = mongoose.model("Job",jobSchema);