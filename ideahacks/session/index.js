const session = require("express-session")
const config = require("../config")

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
	module.exports = session({
		secret: process.env.sessionSecret,
		resave: false,
		saveUninitialized: false,
	})
} else {
	module.exports = session({
		secret: config.sessionSecret,
		resave: false,
		saveUninitialized: true,
	})
}
