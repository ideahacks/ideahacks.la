const express = require('express')
const mainRouter = express.Router()
const staticHandlers = require('./static.js')
const signupHandlers = require('./signup.js')

mainRouter.get('/', staticHandlers.getMain)

mainRouter.get('/team', staticHandlers.getTeam)

mainRouter.get('/login', signupHandlers.getLogin)
mainRouter.post('/login', signupHandlers.postLogin)

mainRouter.get('/registration', signupHandlers.getRegistration)
mainRouter.post('/registration', signupHandlers.postRegistration)

module.exports = mainRouter
