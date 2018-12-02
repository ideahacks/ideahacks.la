const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FeedbackSchema = new Schema({
	content: { type: String, default: "" },
	timestamp: { type: Date, default: Date.now },
	user: { type: Schema.Types.ObjectId, ref: "User" }
})

module.exports = mongoose.model("Feedback", FeedbackSchema)
