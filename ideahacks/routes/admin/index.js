const express = require('express')
const adminRouter = express.Router() //create instance of an express router
const adminHandlers = require('./admin.js') // grab the module in static.js

adminRouter.get('/admin', adminHandlers.getAdmin)

module.exports = adminRouter

