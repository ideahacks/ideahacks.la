const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
	// application info
	// personal info
	email: { type: String, unique: true },
	password: { type: String, default: "" },
	firstName: { type: String, default: "" },
	lastName: { type: String, default: "" },
	phone: { type: String, default: "" },
	school: { type: String, default: "University of California, Los Angeles" },
	major: { type: String, default: "" },
	year: { type: String, default: "Freshman" },
	github: { type: String, default: "" },
	linkedin: { type: String, default: "" },

	// team info
	hasTeam: { type: Boolean, default: false },
	teamNumber: { type: Number, default: -1 },
	teammates: { type: [String], default: [] }, //emails
	teammates_names: { type: [String], default: [] },

	// short answer
	skillsAndExperience: { type: String, default: "" },
	hasPastHackathonExperience: { type: Boolean, default: false },
	pastHackathonExperience: { type: String, default: "" },
	reasonForParticipation: { type: String, default: "" },
	themeIdea: { type: String, default: "" },

	// misc info
	foodRestrictions: { type: String, default: "" },
	desiredParts: { type: String, default: "" },
	shirtSize: { type: String, default: "M" },

	// non-application fields
	// boolean fields
	hasApplication: { type: Boolean, default: false },
	applicationStatus: { type: String, default: "pending" },

	// auth fields
	verificationHash: String,
	isVerified: { type: Boolean, default: false },
	isAdmin: { type: Boolean, default: false },

	// Check in/out fields
	checkinTime: Date,
	checkoutTime: Date
})

module.exports = mongoose.model("User", UserSchema)
