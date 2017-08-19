const express = require('express')
const apiRouter = express.Router()
const userApiHandlers = require('./users.js')

apiRouter.get('/user', userApiHandlers.getUser)
apiRouter.post('/user', userApiHandlers.postUser)
apiRouter.delete('/user', userApiHandlers.deleteUser)

module.exports = apiRouter
