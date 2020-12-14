const mongoose = require("mongoose");
const experience = require("./experience")
const education = require("./education")
const project = require("./project")
const passportlocalmongoose = require("passport-local-mongoose");

const jobseekerSchema = new mongoose.Schema({
    username:{type:String,unique:true,required:true,trim:true},
    email:{type:String,unique:true,required:true,trim:true},
    isverified:{type:Boolean,default:false},
    // address:{type:String},
    experience:[
        experience.schema
    ],
    education:[
        education.schema
    ],
    skills:[
        {
         name:String,
         level:String
       }
     ],
    project:[
        project.schema
    ],
    resume:{url:String,public_id:String},
    dob:{type:Date},
    bio:{
    fullname:String,
    about:String,
    country:String,
    // city:String,
    phone:String,
    gender:String,
    nationality:String,
    currentCompany:String
}
},{timestamps:true}) 

jobseekerSchema.plugin(passportlocalmongoose, {
    usernameField: 'email'
  });
module.exports = mongoose.model("Jobseeker",jobseekerSchema)