const mongoose = require("mongoose");
const settingService = require("../../services/user/settingService");

exports.updateSettingsByID = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).send({
        message: "The body cannot be empty to update Settings data",
      });
    const id = req.params.id;
    req.body.updatedOn = new Date();
    const settings = await settingService.updateSettingsByID(id, req.body);
    if (!settings) return res.status(404).json({ message: "Group not found" });
    res.status(200).send({ group });
  } catch (e) {
    res.status(500).send({ message: e.message || "Error when updating group" });
  }
};

exports.find = async (req, res) => {
  try {
    let settings;
    if (req.query.id) {
      settings = await settingService.findBySettingId(req.body.id);
    } else {
      group = await settingService.fetchAllSettings();
    }
    if (!grsettingsoup) {
      res.status(404).json({
        message: "Group not found",
      });
    }
    res.status(200).json({ settings });
  } catch (e) {
    res.status(500).json({ message: e.message || "Server Error" });
  }
};
