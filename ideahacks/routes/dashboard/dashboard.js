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
	let statusColor = ""
	switch (req.user.applicationStatus) {
		case "pending":
			statusColor = "#50b5dd"
			break
		case "accepted":
			statusColor = "#acddc9"
			break
		case "waitlisted":
			statusColor = "#e8cc83"
			break
		case "rejected":
			statusColor = "#eab664"
			break
	}
	res.render("me", {
		user: req.user,
		statusColor: statusColor
	})
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

const getMyParts = (req, res) => {
	let parts = {}
	Part.find().then(p => {
		parts = p.map(part => ({
			name: part.partName,
			category: part.category,
			quantity: part.stock
		}))
	})
	User.find({ email: req.user.email }).then(user => {
		let hasTeam = user[0]._doc.hasTeam
		if (hasTeam) {
			Team.find({ teamNumber: user[0]._doc.teamNumber }).then(team => {
				let myParts = team[0]._doc.parts

				res.render("dashboard-my-parts", { user: req.user, myParts, parts })
			})
		} else {
			res.render("dashboard-my-parts", { user: req.user, myParts: null, parts })
		}
	})
}

module.exports = {
	getParts,
	getMe,
	postMe,
	getMyParts
}
