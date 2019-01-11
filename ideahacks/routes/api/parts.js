const express = require("express")

const { Part } = require("../../db")
const c = require("../constants")
const { isVerified, isAdmin } = require("../../helpers/auth")

// partsRouter controls endpoints that manages the parts resource
let partsRouter = express.Router()

/**
 * GET /api/parts returns a list of parts that matches the criteria given
 * by the query parameters
 * @returns list of Parts
 * @throws 500 on error
 *
 * Example: GET /api/parts?partName=Arduino
 */
partsRouter.get("/api/parts", isVerified, getParts)

function getParts(req, res) {
	Part.find(req.query)
		.then(parts => {
			return res.json(parts)
		})
		.catch(err => {
			return res.status(c.StatusInternalError).send(err)
		})
}

/**
 * GET /api/parts/:barcode returns a single part with the matching barcode
 * @returns a single part
 * @throws 404 if part not found, 500 on any other error
 */
partsRouter.get("/api/parts/:barcode", isAdmin, getPartByBarcode)

function getPartByBarcode(req, res) {
	Part.findOne({ barcode: req.params.barcode })
		.then(part => {
			// If part doesn't exist, return not found
			if (!part) {
				return res.status(c.StatusNotFound).send(c.MessageNotFound)
			}

			return res.json(part)
		})
		.catch(err => {
			return res.status(c.StatusInternalError).send(err)
		})
}

/**
 * POST /api/parts creates a part given a part in the request body
 * Will return error if given part doesn't have a name, or if a part with the
 * given name already exists
 * @returns 200 on successful creation
 * @throws 500 on error
 */
partsRouter.post("/api/parts", isAdmin, createPart)

function createPart(req, res) {
	// Check if the given part has a name
	let partName = req.body.partName
	if (!partName) {
		return res.status(c.StatusInternalError).send("Missing part name!")
	}

	// Check if part with matching name already exists, else create new part
	Part.findOne({ partName })
		.then(part => {
			if (part) {
				return res.status(c.StatusInternalError).send("Part with this name already exists!")
			}

			let newPart = new Part(req.body)

			// HACK: Empty string comes through from the front end, but it should default to returnable
			if (newPart.type === "") {
				newPart.type = "returnable"
			}

			newPart
				.save()
				.then(() => {
					return res.send(c.MessageOK)
				})
				.catch(err => {
					return res.status(c.StatusInternalError).send(err)
				})
		})
		.catch(err => {
			return res.status(c.StatusInternalError).send(err)
		})
}

/**
 * PUT /api/parts/:barcode edits the part with the matching barcode
 * given the edited values within the request body
 * @returns 200 on successful edit
 * @throws 404 on part not found, 500 on any other error
 */
partsRouter.put("/api/parts/:barcode", isAdmin, editPartWithBarcode)

function editPartWithBarcode(req, res) {
	Part.findOne({ barcode: req.params.barcode })
		.then(part => {
			// If part doesn't exist, return not found
			if (!part) {
				return res.status(c.StatusNotFound).send("Part with barcode does not exist")
			}

			// Update part with given info and save
			let updatedPart = Object.assign(part, req.body)

			updatedPart
				.save()
				.then(() => {
					return res.send(c.MessageOK)
				})
				.catch(err => {
					return res.status(c.StatusInternalError).send(err)
				})
		})
		.catch(err => {
			return res.status(c.StatusInternalError).send(err)
		})
}

module.exports = partsRouter
