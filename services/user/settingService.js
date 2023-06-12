const mongoose = require("mongoose");
const settingschema = require("../../schema/settings");

exports.updateSettingsByID = async (id, settingsData) => {
  const updatedSettings = await settingschema.findByIdAndUpdate(id, settingsData, {
    new: true,
    runValidators: true,
  });
  return updatedSettings;
};

exports.findBySettingId = async (settingsId) => {
  const settings = await settingschema.findById(settingsId);
  return settings;
}

exports.fetchAllSettings = async () => {
  const settings = await settingschema.find();
  return settings;
}
