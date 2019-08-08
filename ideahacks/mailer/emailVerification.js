const sgMail = require("@sendgrid/mail")
const config = require("../config")

sgMail.setApiKey(config.SENDGRID_API_KEY)

// verify is a function that sends a user the link they need to click on in order
// to verify their account (isVerfied: false => true)
// The link has the form http://ideahacks.la/verify/{user.verificationHash}
function verifyEmail(user) {
	const msg = {
		to: user.email,
		from: "team@ideahacks.la",
		subject: "IDEA Hacks email verification",
		html:
			'Welcome to IDEA Hacks! Please confirm your email address by clicking the following link: <a target="_blank" href="' +
			config.host +
			"/verify/" +
			user.verificationHash +
			'">' +
			"Verify" +
			"</a>"
	}

	sgMail.send(msg)
}

module.exports = verifyEmail
