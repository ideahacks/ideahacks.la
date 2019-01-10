const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PartSchema = new Schema({
	partName: String,
	stock: { type: Number, min: 0 },
	barcode: String,
	category: String,
	description: String,
	type: { type: String, default: "returnable" },
	manufacturer: { type: String, default: "" },
	manufacturerPartNumber: { type: String, default: "" },
	datasheet: { type: String, default: "" },
	imageUrl: String
})

module.exports = mongoose.model("Part", PartSchema)
