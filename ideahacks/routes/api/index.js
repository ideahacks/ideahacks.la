const express = require('express')
const apiRouter = express.Router()
const userApiHandlers = require('./users.js')
const partApiHandlers = require('./parts.js')
const h = require('../../helpers').authHelpers
const feedbackHandlers = require('./feedback.js')

// gets all users within the database
apiRouter.get('/users', h.isAdmin, userApiHandlers.getUsers)

// returns a list of emails from users who fit the query parameters
apiRouter.get('/users/emails', h.isAdmin, userApiHandlers.getUserEmails)

// gets all the users in the database with a specific email
apiRouter.get('/users/:email', h.isAdmin, userApiHandlers.getUserByEmail)

apiRouter.post('/currentuser/checkout', h.isVerified, userApiHandlers.checkoutCurrentUser)

// finds a user with the given email and changes their application tatus to the specified status
apiRouter.post(
  '/users/change/application-status/:email/:newApplicationStatus',
  h.isAdmin,
  userApiHandlers.changeApplicationStatus
)

// PARTS API
// gets all parts from the database
apiRouter.get('/parts', partApiHandlers.getParts)

// gets a single part from the database by it's name
apiRouter.get('/parts/name/:partName', partApiHandlers.getPartByName)

// performs part return or checkout for a given quantity of parts and a team number
apiRouter.post(
  '/parts/action/:action/partName/:partName/quantity/:quantity/teamNumber/:teamNumber',
  h.isAdmin,
  partApiHandlers.handlePartCheckout
)

apiRouter.post('/feedback', h.isVerified, feedbackHandlers.postFeedback)

module.exports = apiRouter
