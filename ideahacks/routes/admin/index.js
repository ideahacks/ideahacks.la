const express = require('express')
const adminRouter = express.Router()
const adminHandlers = require('./admin.js')
const teamHandlers = require('./team.js')
const partsHandlers = require('./parts')

adminRouter.get('/', adminHandlers.getAdmin)

adminRouter.get('/teams', teamHandlers.getTeams)
adminRouter.post('/teams', teamHandlers.postTeams)
adminRouter.delete('/teams', teamHandlers.deleteTeams)

adminRouter.get('/parts', partsHandlers.getParts)
adminRouter.post('/parts', partsHandlers.postParts)
adminRouter.delete('/parts', partsHandlers.deleteParts)

module.exports = adminRouter
