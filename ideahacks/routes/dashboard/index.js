const express = require('express')
const dashboardRouter = express.Router()
const dashboardHandlers = require('./dashboard.js')
const applicationHandlers = require('./application.js')
const h = require('../../helpers').authHelpers
const setResLocals = require('../../helpers').routeHelpers.setResLocals

dashboardRouter.get('/', setResLocals, h.isVerified, dashboardHandlers.getDashboard)

dashboardRouter.get('/application', setResLocals, h.isVerified, applicationHandlers.getApplication)
dashboardRouter.post('/application', setResLocals, h.isVerified, applicationHandlers.postApplication)

dashboardRouter.get('/parts', setResLocals, h.isVerified, dashboardHandlers.getParts)

module.exports = dashboardRouter
