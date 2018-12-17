const User = require("../../db").User

const getApplicationReview = (req, res) => {
	User.find({ hasApplication: true })
		.sort("firstName")
		.then(users => {
			let applicationStats = users.reduce(
				(stats, user, index) => {
					if (user.applicationStatus === "accepted") stats.accepted++
					else if (user.applicationStatus === "pending") stats.pending++
					else if (user.applicationStatus === "rejected") stats.rejected++
					else if (user.applicationStatus === "waitlisted") stats.waitlisted++
					return stats
				},
				{ accepted: 0, rejected: 0, pending: 0, waitlisted: 0 }
			)

			res.render("admin-application-review.hbs", {
				applications: users,
				numberApplications: users.length,
				numberAccepted: applicationStats.accepted,
				numberRejected: applicationStats.rejected,

				numberWaitlisted: applicationStats.waitlisted,

				numberPending: applicationStats.pending
			})
		})
}

module.exports = {
	getApplicationReview
}
