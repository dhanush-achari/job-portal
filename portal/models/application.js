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
})




module.exports = mongoose.model("Application",applicationSchema)