// The config module is responsible for exporting which set of environment variables
// the application should use.

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
	module.exports = {
		dbURI: process.env.dbURI,
		sessionSecret: process.env.sessionSecret,
		host: process.env.host,
		SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	}
} else {
	module.exports = require("./development.json")
}
