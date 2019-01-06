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
 * GET /api/parts/:partName returns a single Part with a matching partName
 * @returns a single Part
 * @throws 404 if Part not found, 500 on any other error
 */
partsRouter.get("/api/parts/:partName", isVerified, getPartByName)

function getPartByName(req, res) {
	Part.findOne({ partName: req.params.partName })
		.then(part => {
			// If Part does not exist, return not found
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

module.exports = partsRouter
