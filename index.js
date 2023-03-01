//Import the necessary libraries to the application
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const app = express();

//Import the DB connection from the config
const connectDB = require('./config/database')

//Log requests
app.use(morgan('tiny'))

//Set up the configuration files
dotenv.config({path: 'config/config.env'})
console.log(process.env.MONGO_URI)

//MongoDB connection
connectDB();

//Define the PORT the application runs on
const PORT = parseInt(process.env.PORT) || 8080;

//Parse request to body parser
app.use(bodyparser.urlencoded({extended: true}))

/**
 * Mounts the specified middleware function or router at the specified path.
 * @param {string} path - The path at which to mount the middleware function or router
 * @param {Function} router - The middleware function or router to mount
 */
app.use('/', require('./routes/router'))

/**
 * Starts the server and listens on the specified port.
 * @param {number} port - The port number to listen on
 * @param {Function} callback - The function to call when the server starts listening
 */
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})