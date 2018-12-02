const Part = require("../../db").Part
const Team = require("../../db").Team

const getParts = (req, res) => {
	Part.find(req.query).then(parts => {
		return res.json(parts)
	})
}

const getPartByName = (req, res) => {
	Part.findOne({ partName: req.params.partName }).then(part => {
		return res.json(part)
	})
}

const handlePartCheckout = (req, res) => {
	// ERROR CHECK: Missing parameters
	if (req.params.action === "undefined" || req.params.id === "undefined") {
		return res.json({ status: "failure", message: "Parts checkout parameters are missing!" })
	}

	Part.findOne({ _id: req.params.id })
		.then(part => {
			// ERROR CHECK: Checking out more parts than available
			if (req.params.action === "check-out" && req.params.quantity > part.stock) {
				return res.json({ status: "failure", message: "Cannot check out more than what we have!" })
			}

			Team.findOne({ teamNumber: req.params.teamNumber })
				.then(team => {
					// ERROR CHECK: non-existant team
					if (!team) {
						return res.json({ status: "failure", message: "A team with that team number doesn't exist!" })
					}

					// check for duplicate part in team, then modify/shove part into team
					let foundDuplicate = false
					for (let k = 0; k < team.parts.length; k++) {
						let ownedPart = team.parts[k]
						if (ownedPart.partName === part.partName) {
							foundDuplicate = true
							if (req.params.action === "returning") {
								// ERROR CHECK: trying to return more than the team owns
								if (parseInt(req.params.quantity) > parseInt(ownedPart.stock)) {
									return res.json({
										status: "failure",
										message: "You can't return more parts than the team currently owns!"
									})
								} else {
									ownedPart.stock -= parseInt(req.params.quantity)
									if (ownedPart.stock === 0) {
										team.parts.splice(k, 1)
										k--
									}
								}
							} else {
								ownedPart.stock += parseInt(req.params.quantity)
							}
							break
						}
					}
					if (!foundDuplicate && req.params.action === "check-out") {
						team.parts.push({
							partName: part.partName,
							stock: req.params.quantity,
							partType: part.type
						})
					} else if (!foundDuplicate && req.params.action === "returning") {
						// ERROR CHECK: trying to return a part the team doesn't own
						return res.json({ status: "failure", message: "The specified team doesn't own this part!" })
					}
					team.save()

					// modify parts stock as needed, then save part
					part.stock =
						req.params.action === "returning"
							? parseInt(part.stock) + parseInt(req.params.quantity)
							: parseInt(part.stock) - parseInt(req.params.quantity)
					part.save()

					return res.json({ message: "success", newStock: part.stock })
				})
				.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
}

const getPartOwners = (req, res) => {
	if (!req.params.id) {
		return res.json({ status: "failure", message: "You need to specify a part ID." })
	}

	Part.findOne({ _id: req.params.id })
		.then(part => {
			let partName = part.partName // Retrieve the name of the part we're looking for
			Team.find()
				.then(teams => {
					// Loop through all teams to see who has the part
					let owners = []
					for (let team of teams) {
						for (let teamPart of team.parts) {
							if (teamPart.partName === partName) {
								owners.push(team.teamName + ": " + teamPart.stock)
								break
							}
						}
					}

					return res.json({ status: "success", owners })
				})
				.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
}

module.exports = {
	getParts,
	getPartByName,
	handlePartCheckout,
	getPartOwners
}
