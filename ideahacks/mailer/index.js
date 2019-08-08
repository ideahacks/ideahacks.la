// The mailer module exports functions that can be used to send emails to users
module.exports = {
	verifyEmail: require("./emailVerification.js"),
	recover: require("./recover.js")
}
