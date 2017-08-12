const express = require('express')
const apiRouter = express.Router()
const teamApiHandlers = require('./team.js')
const userApiHandlers = require('./users.js')

apiRouter.get('/team', teamApiHandlers.getTeam)
apiRouter.post('/team', teamApiHandlers.postTeam)
apiRouter.delete('/team', teamApiHandlers.deleteTeam)


apiRouter.get('/user', userApiHandlers.getUser)
apiRouter.post('/user', userApiHandlers.postUser)
apiRouter.delete('/user', userApiHandlers.deleteUser)


module.exports = apiRouter
