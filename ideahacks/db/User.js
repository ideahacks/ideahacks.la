const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
	// user and application info
	email: { type: String, unique: true },
	password: { type: String, default: "" },
	firstName: { type: String, default: "" },
	lastName: { type: String, default: "" },
	phone: { type: String, default: "" },
	school: { type: String, default: "University of California, Los Angeles" },
	major: { type: String, default: "" },
	year: { type: String, default: "Freshman" },
	// gender: { type: String, default: "Female" },
	github: { type: String, default: "" },
	linkedin: { type: String, default: "" },
	hasTeam: { type: Boolean, default: false },
	teamNumber: { type: Number, default: -1 },
	teammates: { type: [String], default: [] },
	//teammates_names: { type: [String], default: [] },
	//foodRestrictions: { type: String, default: "" },
	skillsAndExperience: { type: String, default: "" },
	hasPastHackathonExperience: { type: Boolean, default: false },
	pastHackathonExperience: { type: String, default: "" },
	reasonForParticipation: { type: String, default: "" },
	themeIdea: { type: String, default: "" },
	// desiredParts: { type: String, default: "" },
	shirtSize: { type: String, default: "M" },
	boxPreferenceOne: { type: String, default: "" },
	boxPreferenceTwo: { type: String, default: "" },
	boxPreferenceThree: { type: String, default: "" },
	canPickUpBox: { type: Boolean, default: false },
	shippingAddress: { type: String, default: "" },

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
