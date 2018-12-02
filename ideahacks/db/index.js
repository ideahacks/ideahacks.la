// Importing the db module will run this file, which will create a
// persistent database connection

const mongoose = require("mongoose")

const { dbURI } = require("../config")

// successfulConnectionMessage is logged on successful connection to the db
const successfulConnectionMessage = "Successfully connected to the database!"

mongoose.connect(
	dbURI,
	{
		useMongoClient: true
	}
)

// Plug in global promise library
mongoose.Promise = global.Promise

// On error connecting to the database, log error
mongoose.connection.on("error", err => {
	console.log("Mongoose error: ", err)
})

// On successful connection to the db, log success message
mongoose.connection.once("open", () => console.log(successfulConnectionMessage))

// Export models within this module
module.exports = {
	User: require("./User.js"),
	Team: require("./Team.js"),
	Part: require("./Part.js"),
	Feedback: require("./Feedback.js"),
	teamData: require("./data/team.js"),
	sponsorsData: require("./data/sponsors.js")
}
