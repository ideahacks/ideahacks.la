const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TeamSchema = new Schema({
	teamNumber: Number,
	parts: [{ name: String, quantity: Number }],
})

module.exports = mongoose.model("Team", TeamSchema)
