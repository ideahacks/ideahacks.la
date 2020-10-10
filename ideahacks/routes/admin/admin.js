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
					list: [
						"supersupersupersuperlongemailfortestingpurposes@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu"
					]
				},
				pending: {
					name: "Pending",
					list: [
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu"
					]
				},
				rejected: {
					name: "Rejected",
					list: [
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu"
					]
				},
				waitlisted: {
					name: "Waitlisted",
					list: [
						"supersupersupersuperlongemailfortestingpurposes@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu",
						"joebruins@g.ucla.edu"
					]
				}
			}
		)

		let mailingLists = emailLists
		// for (let k in emailLists) {
		// 	emailLists[k].list = emailLists[k].list.join(", ")
		// 	mailingLists.push(emailLists[k])
		// }

		return res.render("admin", {
			mailingLists
		})
	})
}

module.exports = {
	getAdmin
}
