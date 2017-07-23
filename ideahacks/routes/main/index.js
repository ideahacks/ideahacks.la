const express = require('express') //get express
const mainRouter = express.router() //create instance of main router
const staticHandlers = require('./static.js') //grab the module in static.js

mainRouter.get('/', staticHandlers.main)

module.exports = mainRouter