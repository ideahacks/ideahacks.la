const express = require('express')
const apiRouter = express.Router()
const apiHandlers = require('./team.js')
const apiHandlers2 = require('./users.js')

apiRouter.get('/team', apiHandlers.getTeam)
apiRouter.post('/team', apiHandlers.postTeam)
apiRouter.delete('/team', apiHandlers.deleteTeam)

apiRouter.get('/users', apiHandlers2.getUsers)
apiRouter.post('/users', apiHandlers2.postUsers)
// apiRouter.delete('/users', apiHandlers2.deleteUsers)

module.exports = apiRouter
