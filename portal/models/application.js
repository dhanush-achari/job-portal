const mongoose = require("mongoose");


const applicationSchema = new mongoose.Schema({
     jobid:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Job"
     },
     jobseekerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Jobseeker"
    },
    employerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employer"
    },

})


module.exports = mongoose.model("Application",applicationSchema)