const express = require("express")
const apiRouter = express.Router()
const userApiHandlers = require("./users.js")
const partApiHandlers = require("./parts.js")
const h = require("../../helpers").authHelpers

// gets all users within the database
apiRouter.get("/users", h.isAdmin, userApiHandlers.getUsers)

// returns a list of emails from users who fit the query parameters
apiRouter.get("/users/emails", h.isAdmin, userApiHandlers.getUserEmails)

// gets all the users in the database with a specific email
apiRouter.get("/users/:email", h.isAdmin, userApiHandlers.getUserByEmail)

apiRouter.post("/currentuser/checkout", h.isVerified, userApiHandlers.checkoutCurrentUser)

// finds a user with the given email and changes their application tatus to the specified status
apiRouter.post(
	"/users/change/application-status/:email/:newApplicationStatus",
	h.isAdmin,
	userApiHandlers.changeApplicationStatus
)

// PARTS API
// gets all parts from the database
apiRouter.get("/parts", partApiHandlers.getParts)

// gets a single part from the database by it's name
apiRouter.get("/parts/name/:partName", partApiHandlers.getPartByName)

// performs part return or checkout for a given quantity of parts and a team number
apiRouter.post(
	"/parts/action/:action/part/:id/quantity/:quantity/teamNumber/:teamNumber",
	h.isAdmin,
	partApiHandlers.handlePartCheckout
)

// Returns a list of teams that have a certain part
apiRouter.get("/parts/owners/:id", h.isAdmin, partApiHandlers.getPartOwners)

module.exports = apiRouter
