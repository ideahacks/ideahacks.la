const User = require("../../db").User

const getAdmin = (req, res) => {
	User.find({ hasApplication: true, isVerified: true }).then(users => {
		// Compile lists of emails for accepted, pending, and rejected users
		let emailLists = users.reduce(
			(lists, user, i) => {
				lists[user.applicationStatus].list.push(user.email)
				return lists
			},
			{
				//hard code emails for testing purposes
				accepted: {
					name: "Accepted",
					list: []
				},
				pending: {
					name: "Pending",
					list: []
				}
			}
		)

		let mailingLists = emailLists

		return res.render("admin", {
			mailingLists
		})
	})
}

module.exports = {
	getAdmin
}
