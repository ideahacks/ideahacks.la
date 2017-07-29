const express = require('express')
const mainRouter = express.Router()
const staticHandlers = require('./static.js')
const signupHandlers = require('./signup.js')

mainRouter.get('/', staticHandlers.main)

mainRouter.get('/team', staticHandlers.team)

mainRouter.get('/login', signupHandlers.login)

module.exports = mainRouter
