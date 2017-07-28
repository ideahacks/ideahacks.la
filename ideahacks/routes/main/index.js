const express = require('express')
const mainRouter = express.Router()
const staticHandlers = require('./static.js')

mainRouter.get('/', staticHandlers.main)

module.exports = mainRouter