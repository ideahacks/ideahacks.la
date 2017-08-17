const express = require('express')
const adminRouter = express.Router()
const adminHandlers = require('./admin.js')
const teamHandlers = require('./team.js')
const partsHandlers = require('./parts')


adminRouter.get('/', adminHandlers.getAdmin)

adminRouter.get('/team', teamHandlers.getTeam)
adminRouter.post('/team', teamHandlers.postTeam)
adminRouter.delete('/team', teamHandlers.deleteTeam)


adminRouter.get('/parts', partsHandlers.getParts)
adminRouter.post('/parts', partsHandlers.postParts)

module.exports = adminRouter
