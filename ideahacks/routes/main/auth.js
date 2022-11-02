const crypto = require("crypto")
const User = require("../../db").User
const passport = require("passport")
const bcrypt = require("bcrypt-nodejs")
const verifyEmail = require("../../mailer").verifyEmail
const sendPasswordRecoverEmail = require("../../mailer").recover

const getLogin = (req, res) => {
	const gError = req.session.gError
	req.session.gError = null
	return res.render("login", {
		gError: gError,
	})
}

const postLogin = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return next(err)

		if (!user) return res.json({ status: "failure", message: "Invalid email or password!" })

		req.login(user, (err) => {
			if (err) return next(err)

			return res.json({ status: "success", message: "Successfully logged in!" })
		})
	})(req, res, next)
}

const getLoginGoogle = (req, res, next) => {
	passport.authenticate("google", {
		scope: ["profile", "email"],
		hd: "g.ucla.edu",
	})(req, res, next)
}

const googleLoginCallback = (req, res, next) => {
	passport.authenticate("google", (err, user, info) => {
		if (user === false) {
			req.session.gError = "Google email must be @g.ucla.edu"
			return res.redirect("/login")
		}

		if (user === null || err) {
			req.session.gError = "Google login failed"
			return res.redirect("/login")
		}

		req.login(user, (err) => {
			if (err) return next(err)
			return res.redirect("/dashboard")
		})
	})(req, res, next)
}

const recoverPassword = (req, res) => {
	User.findOne({ email: req.params.email }).then((user) => {
		if (!user) return res.json({ status: "failure", message: "A user with that email doesn't exist!" })

		sendPasswordRecoverEmail(user)
		return res.json({ status: "success", message: "Your password has been sent to your email address." })
	})
}

const getRegistration = (req, res) => {
	return res.render("registration")
}

const postRegistration = (req, res, next) => {
	const eduEmailRegex = /(\.edu$)|(\.org$)/ // registration email must end in .edu or .org
	if (req.body.password !== req.body.passwordConfirm) {
		return res.json({ status: "failure", message: "Your passwords have to match!" })
	} else if (!eduEmailRegex.test(req.body.email)) {
		return res.json({ status: "failure", message: "The email you register with must be a .edu email!" })
	}

	User.findOne({ email: req.body.email }).then((user) => {
		if (user) return res.json({ status: "failure", message: "A user with this username already exists!" })

		bcrypt.hash(req.body.password, null, null, (err, hashedPassword) => {
			if (err) console.log(err)

			const newUser = new User({
				email: req.body.email,
				password: hashedPassword,
				verificationHash: crypto.randomBytes(24).toString("hex"),
			})
			newUser.save()
			verifyEmail(newUser)

			return res.json({
				status: "success",
				message: "Successfully registered a new user!",
			})
		})
	})
}

const postConfirm = (req, res) => {
	if (!req.user.isVerified) {
		verifyEmail(req.user)
		return res.json({
			status: "success",
			message: "A verification email has been resent to your account.",
		})
	} else {
		return res.json({
			status: "failure",
			message: "This account has already been verified!",
		})
	}
}

const getVerify = (req, res) => {
	User.findOne({ verificationHash: req.params.hash }).then((user) => {
		if (user) {
			user.isVerified = true
			user.verificationHash = ""
			user.save()
			return res.redirect("/dashboard")
		} else {
			return res.redirect("/")
		}
	})
}

const getLogout = (req, res) => {
	req.logout()
	res.redirect("/login")
}

module.exports = {
	getLogin,
	postLogin,
	getLoginGoogle,
	googleLoginCallback,
	recoverPassword,
	getRegistration,
	postRegistration,
	postConfirm,
	getVerify,
	getLogout,
}
