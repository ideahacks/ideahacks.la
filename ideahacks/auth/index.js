const crypto = require("crypto")
const User = require("../db").User
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth20").Strategy
const bcrypt = require("bcrypt-nodejs")
const verifyEmail = require("../mailer").verifyEmail
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("../config/development.json")

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

	// Initialize local strategy

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

	// Initialize Google strategy

	const strategyOptions = {
		clientID: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		callbackURL: "/login/google/callback",
		proxy: true
	}

	const googleAuthProcessor = (accessToken, refreshToken, profile, done) => {
		if (profile._json.hd !== "g.ucla.edu") {
			return done(null, false, { message: "Email must be @g.ucla.edu." })
		}
		User.findOne({ googleID: profile.id }).then(user => {
			if (!user) {
				let newUser = new User({
					email: profile.emails[0].value,
					googleID: profile.id,
					verificationHash: crypto.randomBytes(24).toString("hex")
				})
				newUser.save()
				verifyEmail(newUser)

				return done(null, newUser)
			} else return done(null, user)
		})
	}

	passport.use(new GoogleStrategy(strategyOptions, googleAuthProcessor))
}

module.exports = initializePassport
