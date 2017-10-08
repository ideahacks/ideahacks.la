const express = require('express')
const dashboardRouter = express.Router()
const dashboardHandlers = require('./dashboard.js')
const applicationHandlers = require('./application.js')
const h = require('../../helpers').authHelpers
const setResLocals = require('../../helpers').routeHelpers.setResLocals

dashboardRouter.get('/', setResLocals, h.isAuthenticated, dashboardHandlers.getDashboard)

dashboardRouter.get('/application', setResLocals, h.isAuthenticated, applicationHandlers.getApplication)
dashboardRouter.post('/application', setResLocals, h.isAuthenticated, applicationHandlers.postApplication)

dashboardRouter.get('/parts', setResLocals, /*h.isAuthenticated,*/ dashboardHandlers.getParts)

module.exports = dashboardRouter
