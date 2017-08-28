const express = require('express')
const adminRouter = express.Router()
const adminHandlers = require('./admin.js')
const teamHandlers = require('./team.js')
const partsHandlers = require('./parts')
const h = require('../../helpers').authHelpers

adminRouter.get('/', h.isAuthenticated, adminHandlers.getAdmin)

adminRouter.get('/teams', /*h.isAuthenticated,*/ teamHandlers.getTeams)
adminRouter.post('/teams', /*h.isAuthenticated,*/ teamHandlers.postTeams)
adminRouter.delete('/teams', h.isAuthenticated, teamHandlers.deleteTeams)

adminRouter.get('/parts', h.isAuthenticated, partsHandlers.getParts)
adminRouter.post('/parts', h.isAuthenticated, partsHandlers.postParts)
adminRouter.delete('/parts', h.isAuthenticated, partsHandlers.deleteParts)

module.exports = adminRouter
