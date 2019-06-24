const User = require("../db").User
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt-nodejs")

// initializePassport is a function that initializes the passport module with
// information such as which strategy to use and how to authenticate a user.
const initializePassport = () => {
	passport.serializeUser((user, done) => {
		done(null, user.email)
	})

	passport.deserializeUser((username, done) => {
		User.findOne({ email: username })
			.then(user => done(null, user))
			.catch(err => console.log(err))
	})

	const authProcessor = (username, password, done) => {
		User.findOne({ email: username }).then(user => {
			if (!user) {
				return done(null, false, { message: "Incorrect username." })
			}
			bcrypt.compare(password, user.password, (err, response) => {
				if (err) console.log(err)
				if (!response) return done(null, false, { message: "Incorrect password." })

				return done(null, user)
			})
		})
	}

	passport.use(new LocalStrategy(authProcessor))
}

module.exports = initializePassport
