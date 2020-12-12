const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");


const employerschema = new mongoose.Schema({
      
    fullname:String,
    email:{type:String,unique:true,required:true,trim:true},
    isverified:{type:Boolean,default:false},
    address:String,
    phone:String,
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"
    }
},{timestamps:true})


module.exports = mongoose.model("Employer",employerschema);
