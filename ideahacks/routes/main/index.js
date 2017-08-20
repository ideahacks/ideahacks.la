const express = require('express')
const passport = require('passport')
const mainRouter = express.Router()
const staticHandlers = require('./static.js')
const authHandlers = require('./auth.js')
const h = require('../../helpers').authHelpers

mainRouter.get('/', staticHandlers.getMain)

mainRouter.get('/team', staticHandlers.getTeam)

mainRouter.get('/login', authHandlers.getLogin)
mainRouter.post('/login', authHandlers.postLogin)

mainRouter.get('/registration', authHandlers.getRegistration)
mainRouter.post('/registration', authHandlers.postRegistration)

module.exports = mainRouter
