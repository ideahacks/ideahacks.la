const express = require('express')
const apiRouter = express.Router()
const apiHandlers = require('./team.js')

apiRouter.get('/team', apiHandlers.getTeam)
apiRouter.post('/team', apiHandlers.postTeam)
apiRouter.delete('/team', apiHandlers.deleteTeam)

module.exports = apiRouter
