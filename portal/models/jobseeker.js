const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");

const jobseekerSchema = new mongoose.Schema({

}) 


module.exports = mongoose.model("Jobseeker",jobseekerSchema)