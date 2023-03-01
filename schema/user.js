const mongoose = require('mongoose');

/**
 * Represents a user account.
 * @typedef {Object} User
 * @property {string} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} pin - The PIN for the user's account.
 * @property {number} accountBalance - The balance of the user's account.
 * @property {string} email - The email address associated with the user's account.
 * @property {string} phoneNumber - The phone number associated with the user's account.
 * @property {string} address - The address associated with the user's account.
 */

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    accountBalance: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;