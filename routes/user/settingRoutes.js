const express = require("express");
const checkAuth = require("../../middleware/authentication");
const route = express.Router();

const settingsController = require("../../controllers/user/settingsController");

route.patch("/:id", checkAuth, settingsController.updateSettingsByID);
route.get("/", checkAuth, settingsController.find);

module.exports = route;