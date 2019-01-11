const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TeamSchema = new Schema({
	teamNumber: Number,
	parts: [String]
})

module.exports = mongoose.model("Team", TeamSchema)
