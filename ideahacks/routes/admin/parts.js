const Part = require("../../db").Part

function getCategories(parts) {
	const categories = new Set(
		parts.map(() => {
			return parts.category
		})
	)

	return categories
}

const getParts = (req, res) => {
	Part.find().then((parts) => {
		res.render("admin-parts", { parts, categories: getCategories(parts) })
	})
}

const createParts = (req, res) => {
	return res.render("admin-create-parts", { categories: Part.find().then((parts) => getCategories(parts)) })
}

const postParts = (req, res) => {
	Part.find({ partName: req.body.partName }).then((parts) => {
		if (parts.length > 0) {
			return res.json({ status: "failure", message: "Part already exists" })
		}

		const newPart = new Part({
			partName: req.body.partName,
			stock: req.body.stock,
			description: req.body.description,
			owners: [],
			type: req.body.type,
			manufacturer: req.body.manufacturer,
			manufacturerPartNumber: req.body.manufacturerPartNumber,
			datasheet: req.body.datasheet,
		})
		newPart.save()

		return res.json({ status: "success", message: "Success! Part has been created", id: newPart._id })
	})
}

module.exports = {
	getParts,
	postParts,
	createParts,
}
