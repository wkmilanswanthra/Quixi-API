//Import the necessary libraries to the application
const express = require("express");

// Create an instance of the Express router
const route = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');  
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const upload = multer({storage: storage});

const checkAuth = require("../../middleware/authentication");

const userController = require("../../controllers/user/userController");

route.post("/signup", userController.createUser);
route.post("/login", userController.loginUser);
// route.get("/validate", checkAuth, userController.validate);
route.get("/", checkAuth, userController.find);
route.get("/:user", checkAuth, userController.find);
route.patch("/:id", checkAuth, userController.updateUserById);
route.delete("/:id", checkAuth, userController.deleteUserById);
route.patch("/:id/profileImg", checkAuth, upload.single('profileImage'), userController.updateUserProfileImage);

//Export router
module.exports = route;
