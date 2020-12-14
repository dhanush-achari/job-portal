const express = require('express');
const router = express.Router();
const {errorHandler} = require("../middleware/index")
const {addDetails,UpdateDetails,DeleteDetails,PersonalDetails}  =  require("../controller/user")




/* Post user personal details 
  make form multipart and upload the resume to the cloudinary and store the link and the public id
*/
router.put("/",errorHandler(PersonalDetails));

/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
  res.render("applicant-profile")
});

/* 
Post user details
*/
router.post("/details",errorHandler(addDetails))
/* 
Update the details
*/
router.put("/details/:id",errorHandler(UpdateDetails))


/* delete the experience  */
router.delete("/experience/:id",errorHandler(DeleteDetails))

/* delete the education  */
router.delete("/education/:id",errorHandler(DeleteDetails))


/* delete the project  pull the object from the array using id and save the profile*/
router.delete("/project/:id",errorHandler(DeleteDetails))










/* 
Post user skills
user posts skills, check if role is user and push into logged in user array {name:skillname,level:['beginer','advanced','intermediate']}
*/
router.post("/skill",errorHandler(addDetails))

/* 
Update the skill
allow only level to be updated and each skill name should be unique find the array then array[name] = level
*/
router.put("/skill",errorHandler(UpdateDetails))


/* delete the skill  pull the object from the array using name and save the profile*/
router.delete("/skill",errorHandler(DeleteDetails))


module.exports = router;
