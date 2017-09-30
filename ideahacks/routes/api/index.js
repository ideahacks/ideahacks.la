const express = require('express')
const apiRouter = express.Router()
const userApiHandlers = require('./users.js')

// gets all users within the database
apiRouter.get('/users', userApiHandlers.getUsers)

// gets all the users in the database with a specific email
apiRouter.get('/users/:email', userApiHandlers.getUserByEmail)

// returns a comma separated list of accepted users' email
apiRouter.get('/users/acceptance/:acceptance', userApiHandlers.getUserEmailsByAcceptance)

// finds a user with the given email and changes their application tatus to the specified status
apiRouter.post('/users/change/application-status/:email/:newApplicationStatus', userApiHandlers.changeApplicationStatus)

// delete all users within the database
apiRouter.delete('/users', userApiHandlers.deleteUsers)

module.exports = apiRouter
