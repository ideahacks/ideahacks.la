const express = require('express')
const apiRouter = express.Router()
const userApiHandlers = require('./users.js')
const partApiHandlers = require('./parts.js')

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

// PARTS API
// gets all parts from the database
apiRouter.get('/parts', partApiHandlers.getParts)

// gets a single part from the database by it's name
apiRouter.get('/parts/name/:partName', partApiHandlers.getPartByName)

// performs part return or checkout for a given quantity of parts and a team number
apiRouter.post(
  '/parts/action/:action/partName/:partName/quantity/:quantity/teamNumber/:teamNumber',
  partApiHandlers.handlePartCheckout
)

module.exports = apiRouter
