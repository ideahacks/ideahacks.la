// The ideahacks module exports the route and session configuration to be used
// in the express application.
// Requiring the ideahacks module runs the initializePassport function.
require("./auth")()

module.exports = {
	routes: require("./routes"),
	session: require("./session"),
}
