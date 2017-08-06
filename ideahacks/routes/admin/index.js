const express = require('express')
const adminRouter = express.Router()
const adminHandlers = require('./admin.js')

adminRouter.get('/admin', adminHandlers.getAdmin)

module.exports = adminRouter
