const User = require("../../db").User

const getUsers = (req, res) => {
	// API endpoint that queries users from the database
	//
	// Sample API response:
	// {
	//   users: [{ User }, { User }, ...],
	//   numberOfUsers: Number
	// }

	User.find(req.query).then(users => {
		return res.json({ users })
	})
}

const getUserEmails = (req, res) => {
	// API endpoint that returns a list of emails based on query parameters.
	// Meant to be readily copied into an email.
	//
	// Sample API response:
	// email, email, email, email, ...

	User.find(req.query, "email").then(users => {
		let emailList = users.map(user => user.email).join(", ")
		return res.send(emailList)
	})
}

const getUserByEmail = (req, res) => {
	User.findOne({ email: req.params.email }).then(user => {
		return res.json(user)
	})
}

const checkoutCurrentUser = (req, res) => {
	// POST /api/currentuser/checkout handler that sets the current user's
	// checkoutTime field to Date.now to mark down when they have permanently
	// left the event

	req.user["checkoutTime"] = Date.now()
	req.user.save()
	return res.json({ status: "success", message: "Checked user out of IDEA Hacks" })
}

const changeApplicationStatus = (req, res) => {
	User.findOne({ email: req.params.email }).then(user => {
		user.applicationStatus = req.params.newApplicationStatus
		user.save()

		return res.json({ status: "success", message: "Successfully changed application status!" })
	})
}

module.exports = {
	getUsers,
	getUserEmails,
	getUserByEmail,
	checkoutCurrentUser,
	changeApplicationStatus
}
