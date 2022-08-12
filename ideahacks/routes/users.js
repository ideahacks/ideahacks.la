const express = require("express")

const { User } = require("../db")
const c = require("./constants")
const { isAdmin } = require("../helpers/auth")

// userRouter controls endpoints that manage the user resource
let userRouter = express.Router()

/**
 * GET /api/users returns a list of users that matches the criteria given
 * by the query parameters
 * @returns list of Users
 * @throws 500 on error
 *
 * Example: GET /api/users?email=jeffrey.chan@ucla.edu
 */
userRouter.get("/api/users", isAdmin, getUsers)

function getUsers(req, res) {
	User.find(req.query)
		.then((users) => {
			return res.json({ users })
		})
		.catch((err) => {
			return res.status(c.StatusInternalError).send(err)
		})
}

/**
 * GET /api/users/emails returns a list of users that matches the criteria given
 * by the query parameters
 * @returns [string] of user emails
 * @throws 500 on error
 *
 * Example: GET /api/users/emails?applicationStatus=pending
 */
userRouter.get("/api/users/emails", isAdmin, getUserEmails)

function getUserEmails(req, res) {
	User.find(req.query, "email")
		.then((users) => {
			let emailList = users.map((user) => user.email).join(", ")
			return res.send(emailList)
		})
		.catch((err) => {
			return res.status(c.StatusInternalError).send(err)
		})
}

/**
 * GET /api/users/:email returns a single user with a matching email address
 * @returns a User
 * @throws 500 on error
 *
 * Example: GET /api/users/jeffrey.chan@ucla.edu
 */
userRouter.get("/api/users/:email", isAdmin, getUserByEmail)

function getUserByEmail(req, res) {
	User.findOne({ email: req.params.email })
		.then((user) => {
			return res.json(user)
		})
		.catch((err) => {
			return res.send(c.StatusInternalError).send(err)
		})
}

/**
 * POST /api/users/change/application-status/:email/:newApplicationStatus
 * updates the application status of a user with :newApplciationStatus
 * @returns 200 on success
 * @throws 500 on error
 *
 * Example: POST /api/users/change/application-status/jeffrey.chan@ucla.edu/accepted
 */
userRouter.post("/api/users/change/application-status/:email/:newApplicationStatus", isAdmin, changeApplicationStatus)

function changeApplicationStatus(req, res) {
	User.findOne({ email: req.params.email })
		.then((user) => {
			user.applicationStatus = req.params.newApplicationStatus
			user
				.save()
				.then(() => {
					return res.json({ status: "success", message: "Successfully changed application status!" })
				})
				.catch((err) => {
					return res.status(c.StatusInternalError).send(err)
				})
		})
		.catch((err) => {
			return res.status(c.StatusInternalError).send(err)
		})
}

/**
 * PUT /api/users/:email edits the user with the matching email
 * given the edited values within the requst body.
 * @returns 200 on successful edit
 * @returns 404 on team not found, 500 on any other error
 */

userRouter.put("/api/users/:email", isAdmin, editUser)

function editUser(req, res) {
	User.findOne({ email: req.params.email })
		.then((user) => {
			// If team does not exist, return not found
			if (!user) {
				return res.status(c.StatusNotFound).send("User with given email does not exist")
			}

			// Update team with info in request body and save
			let updatedUser = Object.assign(user, req.body)

			updatedUser
				.save()
				.then(() => {
					return res.send(c.MessageOK)
				})
				.catch((err) => {
					return res.status(c.StatusInternalError).send(err)
				})
		})
		.catch((err) => {
			return res.status(c.StatusInternalError).send(err)
		})
}

module.exports = userRouter
