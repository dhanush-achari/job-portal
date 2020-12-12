const mongoose = require("mongoose");
const experience = require("./experience")
const education = require("./education")
const project = require("./project")
const passportlocalmongoose = require("passport-local-mongoose");

const jobseekerSchema = new mongoose.Schema({
    username:{type:String,unique:true,required:true,trim:true},
    fullname:String,
    email:{type:String,unique:true,required:true,trim:true},
    isverified:{type:Boolean,default:false},
    address:{type:String},
    experience:[
        experience.schema
    ],
    education:[
        education.schema
    ],
    skills:[
        {
         name:String,
         level:string
       }
     ],
    project:[
        project.schema
    ],
    resume:[{url:string,public_id:String}],
    about:String,
    country:String,
    city:String,
    phone:String


},{timestamps:true}) 


module.exports = mongoose.model("Jobseeker",jobseekerSchema)