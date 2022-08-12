const User = require("../../db").User

const getAdmin = (req, res) => {
	User.find({ hasApplication: true, isVerified: true }).then((users) => {
		// Compile lists of emails for accepted, pending, and rejected users
		let emailLists = users.reduce(
			(lists, user, i) => {
				lists[user.applicationStatus].list.push(user.email)
				return lists
			},
			{
				pending: { name: "Pending", list: [] },
				accepted: { name: "Accepted", list: [] },
				rejected: { name: "Rejected", list: [] },
				waitlisted: { name: "Waitlisted", list: [] },
			}
		)

		let mailingLists = emailLists
		// for (let k in emailLists) {
		// 	emailLists[k].list = emailLists[k].list.join(", ")
		// 	mailingLists.push(emailLists[k])
		// }

		return res.render("admin", {
			mailingLists,
		})
	})
}

module.exports = {
	getAdmin,
}
