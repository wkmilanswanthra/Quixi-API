const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  _id: {
    type: mongoose.mongo.ObjectId,
  },
  appearance: {
    type: String,
    enum: ["dark", "light"],
    default: "light",
  },
  notifications: {
    groupNotifications: {
      type: Boolean,
      default: true,
    },
    deftReceived: {
      type: Boolean,
      default: true,
    },
  },
  twoFactorAuth: {
    type: Boolean,
    default: false,
  },
  loginMethod: {
    type: String,
    enum: ["pin", "password", "bioAuth"],
    default: "password",
  },
  updatedOn: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
