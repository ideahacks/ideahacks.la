const express = require('express')
const mainRouter = express.Router()
const staticHandlers = require('./static.js')
const authHandlers = require('./auth.js')
const dashboardHandlers = require('./dashboard.js')

mainRouter.get('/', staticHandlers.getMain)

mainRouter.get('/team', staticHandlers.getTeam)

mainRouter.get('/login', authHandlers.getLogin)
mainRouter.post('/login', authHandlers.postLogin)

mainRouter.get('/registration', authHandlers.getRegistration)
mainRouter.post('/registration', authHandlers.postRegistration)

mainRouter.get('/dashboard', dashboardHandlers.getDashboard)

mainRouter.get('/application', dashboardHandlers.getApplication)

module.exports = mainRouter
