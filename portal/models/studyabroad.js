const mongoose = require("mongoose");

const AbroadSchema = new mongoose.Schema({
firstName: String,
lastName: String,
Email: String,
Phone: String,
Dob: Date,
countryOfResidence: String,
studyDestination: String,
studyMonth: String,
studyYear: String,
IDPevent: String,
preferredCourse: String,
levelOfStudy: String,
highestEducation: String,
primaryFinancialSource: String,
checkOne: boolean,
checkTwo: boolean,
checkThree: boolean,
preferredSession: String
});

module.exports = mongoose.model("Abroad",AbroadSchema)
