const bcrypt = require("bcrypt-nodejs")

const Part = require("../../db").Part
const { Team } = require("../../db")
const { User } = require("../../db")

const getParts = (req, res) => {
	Part.find().then(parts => {
		res.render("dashboard-parts", { parts })
	})
}

const getMe = (req, res) => {
	res.render("me", { user: req.user })
}

const postMe = (req, res) => {
	// POST /dashboard/me handler that takes a POST request that looks like:
	// {
	//   'firstName': ...,
	//   'lastName': ...,
	//   'email': ...,
	//   'newPassword': ...
	// }
	// and makes the requested changes to the current user

	if (req.body.firstName) {
		req.user.firstName = req.body.firstName
	}

	if (req.body.lastName) {
		req.user.lastName = req.body.lastName
	}

	if (req.body.email) {
		req.user.email = req.body.email
	}

	bcrypt.hash(req.body["newPassword"], null, null, (err, hashedPassword) => {
		if (err) console.log(err)

		// Ignore empty password change request
		if (req.body.newPassword !== "") {
			req.user.password = hashedPassword
		}
		req.user
			.save()
			.then(() => {
				return res.json({ status: "success", message: "Successfully saved profile changes." })
			})
			.catch(err => {
				return res.send(err)
			})
	})
}

const getTeams = (req, res) => {
	Team.find().then(teams => {
		res.render("dashboard-team-parts", { teams })
	})
}

const getMyParts = (req, res) => {
	User.find({email : req.user.email}).then(user => {
		Team.find({teamNumber: user[0]._doc.teamNumber}).then(team => {
			let parts = team[0]._doc.parts
			res.render("dashboard-my-parts", { parts })
		})
	})
}
module.exports = {
	getParts,
	getMe,
	postMe,
	getTeams,
	getMyParts
}
