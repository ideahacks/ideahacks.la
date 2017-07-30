const express = require('express')
const mainRouter = express.Router()
const staticHandlers = require('./static.js')
const signupHandlers = require('./signup.js')

mainRouter.get('/', staticHandlers.getMain)

mainRouter.get('/team', staticHandlers.getTeam)

mainRouter.get('/login', signupHandlers.getLogin)

mainRouter.get('/registration', signupHandlers.getRegistration)

module.exports = mainRouter
