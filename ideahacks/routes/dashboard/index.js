const express = require('express')
const dashboardRouter = express.Router()
const dashboardHandlers = require('./dashboard.js')
const applicationHandlers = require('./application.js')
const h = require('../../helpers').authHelpers

dashboardRouter.get('/', h.isAuthenticated, dashboardHandlers.getDashboard)

dashboardRouter.get('/application', h.isAuthenticated, applicationHandlers.getApplication)
dashboardRouter.post('/application', h.isAuthenticated, applicationHandlers.postApplication)

module.exports = dashboardRouter
