const express = require('express')
const apiRouter = express.Router()
const apiHandlers = require('./team.js')

apiRouter.get('/teams', apiHandlers.getTeams)
apiRouter.post('/teams', apiHandlers.postTeams)
apiRouter.post('/teams', apiHandlers.deleteTeams)

module.exports = apiRouter