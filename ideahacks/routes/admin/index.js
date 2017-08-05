const express = require('express')
const adminRouter = express.Router() //create instance of an express router
const adminHandlers = require('./static.js') // grab the module in static.js

adminRouter.get('/admin', adminHandlers.getAdmin)

module.exports = adminRouter

