const mongoose = require("mongoose");
const experience = require("./experience")
const education = require("./education")
const project = require("./project")
const passportlocalmongoose = require("passport-local-mongoose");

const jobseekerSchema = new mongoose.Schema({
    username:{type:string,unique:true,required:true,trim:true},
    fullname:string,
    email:{type:string,unique:true,required:true,trim:true},
    isverified:{type:Boolean,default:false},
    address:{type:string},
    experience:[
        experience.schema
    ],
    education:[
        education.schema
    ],
    skills:[
        {
         name:string,
         level:string
       }
     ],
    project:[
        project.schema
    ],
    resume:[{url:string,public_id:string}],
    about:string,
    country:string,
    city:string,
    phone:string


},{timestamps:true}) 


module.exports = mongoose.model("Jobseeker",jobseekerSchema)