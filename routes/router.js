//Import the necessary libraries to the application
const express = require("express");

// Create an instance of the Express router
const route = express.Router();

/**
 * GET /
 * Returns a string indicating that the server is running.
 *
 * @function
 * @param {express.Request} req - The HTTP request object.
 * @param {express.Response} res - The HTTP response object.
 * @returns {void}
 */
route.get('/', (req, res) => {
    res.send("Running");
});

//Export router
module.exports = route;