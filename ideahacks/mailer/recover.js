const bcrypt = require("bcrypt-nodejs")
const crypto = require("crypto")
const sgMail = require("@sendgrid/mail")
const config = require("../config")

sgMail.setApiKey(config.SENDGRID_API_KEY)

// recover is a function that resets a user's password with a temporary one,
// and sends the user their new temp password
function recover(user) {
	let tempPassword = crypto.randomBytes(6).toString("hex")

	bcrypt.hash(tempPassword, null, null, (err, hashedPassword) => {
		if (err) console.log(err)

		user.password = hashedPassword
		user.save()
	})

	const msg = {
		to: user.email,
		from: "team@ideahacks.la",
		subject: "IDEA Hacks password reset",
		html: "Your temporary IDEA Hacks password is: " + tempPassword + " . Log in and change your password."
	}

	sgMail.send(msg)
}

module.exports = recover
