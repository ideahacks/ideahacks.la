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
		const hasTeam = user[0].teamNumber !== -1

		if (hasTeam) {
			Team.find({ teamNumber: user[0].teamNumber }).then((team) => {
				const myParts = team[0].parts

				res.render("dashboard-my-parts", { hasTeam, user: req.user, myParts, parts })
			})
		} else {
			res.render("dashboard-my-parts", { user: req.user, myParts: null, parts })
		}
	})
}

const getMyTeam = (req, res) => {
	const team = []
	const promises = []

	const teammatesEmails = req.user.teammates

	for (const email of teammatesEmails) {
		const teammate = User.find({ email })

		promises.push(teammate)
	}

	Promise.all(promises).then((teammates) => {
		for (let i = 0; i < teammates.length; i++) {
			const teammate = teammates[i]

			// If teammate cannot be found in the database, only provide their email
			// (since that's all we have)
			if (Array.isArray(teammate) && teammate.length > 0) {
				const name = teammate[0].firstName + " " + teammate[0].lastName
				const email = teammate[0].email
				const major = teammate[0].major
				const year = teammate[0].year

				team.push({ name, email, major, year })
			} else {
				team.push({ name: "", email: teammatesEmails[i], major: "", year: "" })
			}
		}

		res.render("dashboard-my-team", { team })
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
