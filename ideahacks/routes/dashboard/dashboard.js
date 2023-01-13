const bcrypt = require("bcrypt-nodejs")

const Part = require("../../db").Part
const { Team } = require("../../db")
const { User } = require("../../db")

function getCategories(parts) {
	const categories = new Set(
		parts.map((part) => {
			return part.category
		})
	)

	return categories
}

const getParts = (req, res) => {
	Part.find().then((parts) => {
		res.render("dashboard-parts", { parts, categories: getCategories(parts) })
	})
}

const getMe = (req, res) => {
	let statusDescription = ""
	let accepted = false
	switch (req.user.applicationStatus) {
		case "pending":
			statusDescription = "Your application is under review!"
			break
		case "accepted":
			statusDescription = "Welcome to IDEA Hacks!"
			accepted = true
			break
		case "waitlisted":
			statusDescription = "We’ll be in touch if a spot opens up!"
			break
		case "rejected":
			statusDescription = "We’re sorry we didn’t have room"
			break
	}
	res.render("me", {
		user: req.user,
		statusDescription: statusDescription,
		accepted: accepted,
	})
}

const getSettings = (req, res) => {
	return res.render("settings", { email: req.user.email })
}

const postSettings = (req, res) => {
	// POST /dashboard/me/settings handler that takes a POST request that looks like:
	// {
	//   'email': ...,
	//   'newPassword': ...
	// }
	// and makes the requested changes to the current user

	if (req.body.email) {
		const emailRegex = /\.edu$/
		if (!emailRegex.test(req.body.email)) {
			return res.json({ status: "failure", message: "Email must end in .edu!" })
		}
		req.user.email = req.body.email

		var emailChanged = true
	}

	bcrypt.hash(req.body.newPassword, null, null, (err, hashedPassword) => {
		if (err) console.log(err)

		// Ignore empty password change request
		if (req.body.newPassword !== "") {
			req.user.password = hashedPassword
		}

		User.findOne({ email: req.user.email }).then((u) => {
			if (u && emailChanged) {
				return res.json({
					status: "failure",
					message: "A user with this email already exists!",
				})
			}

			req.user
				.save()
				.then(() => {
					return res.json({ status: "success", message: "Successfully saved profile changes." })
				})
				.catch((err) => {
					return res.send(err)
				})
		})
	})
}

const getMyParts = (req, res) => {
	let parts = {}
	Part.find().then((p) => {
		parts = p.map((part) => ({
			name: part.partName,
			category: part.category,
			quantity: part.stock,
		}))
	})
	User.find({ email: req.user.email }).then((user) => {
		const hasTeam = user[0]._doc.hasTeam
		if (hasTeam) {
			Team.find({ teamNumber: user[0]._doc.teamNumber }).then((team) => {
				const myParts = team[0]._doc.parts

				res.render("dashboard-my-parts", { user: req.user, myParts, parts })
			})
		} else {
			res.render("dashboard-my-parts", { user: req.user, myParts: null, parts })
		}
	})
}

const getMyTeam = (req, res) => {
	var team = []

	const teammatesEmails = req.user.teammates

	const tlen = teammatesEmails.length

	var promises = []

	for (let i = 0; i < tlen; i++) {
		const email = teammatesEmails[i]

		const teammate = User.find({ email: email })

		promises.push(teammate)
		// console.log(typeof teammate)
	}

	Promise.all(promises).then((values) => {
		for (let i = 0; i < tlen; i++) {
			const teammate = values[i]

			const name = teammate[0]._doc.firstName + " " + teammate[0]._doc.lastName
			const email = teammate[0]._doc.email
			const major = teammate[0]._doc.major
			const year = teammate[0]._doc.year

			// console.log(name, email, major, year)

			team.push({ name, email, major, year })
		}

		// console.log("team", team)

		res.render("dashboard-my-team", { team })

		// console.log(values)
	})
}

module.exports = {
	getParts,
	getMe,
	getSettings,
	postSettings,
	getMyParts,
	getMyTeam,
}
