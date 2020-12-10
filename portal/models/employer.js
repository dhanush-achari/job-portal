const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");


const employerschema = new mongoose.Schema({
      
    fullname:String,
    email:{type:string,unique:true,required:true,trim:true},
    isverified:{type:Boolean,default:false},
    address:string,
    phone:string,
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"
    }
},{timestamps:true})


module.exports = mongoose.model("Employer",employerschema);