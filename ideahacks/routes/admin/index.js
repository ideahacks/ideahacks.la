const express = require('express')
const adminRouter = express.Router()
const adminHandlers = require('./admin.js')
const teamHandlers = require('./team.js')

adminRouter.get('/', adminHandlers.getAdmin)

adminRouter.get('/team', teamHandlers.getTeam)
adminRouter.post('/team', teamHandlers.postTeam)
adminRouter.delete('/team', teamHandlers.deleteTeam)

module.exports = adminRouter
