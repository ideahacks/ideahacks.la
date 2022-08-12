const formatUser = require("../../helpers").formatters.formatUser
const c = require("../constants")

const getApplication = (req, res) => {
	req.user = formatUser(req.user)
	res.render("dashboard-application", { user: req.user })
}

const postApplication = (req, res) => {
	const oldHasApplicationStatus = req.user.hasApplication
	for (const key in req.body) {
		req.user[key] = req.body[key]
	}

	// process hasTeam
	req.user.teammates = req.body.teammates ? req.body.teammates : []

	if (oldHasApplicationStatus === true) {
		req.user.hasApplication = true
	} else if (oldHasApplicationStatus === false && req.body.hasApplication === "true") {
		req.user.hasApplication = true
	}
	req.user
		.save()
		.then(() => {
			return res.status(c.StatusOK).send("Successfully submitted!")
		})
		.catch((err) => {
			console.log(err)
			return res.status(c.StatusInternalError).send(c.MessageInternalError + err)
		})
}

module.exports = {
	getApplication,
	postApplication,
}
