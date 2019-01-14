const express = require("express")

const { Team } = require("../../db")
const c = require("../constants")
const { isAdmin } = require("../../helpers/auth")

// teamRouter controls endpoints that manages the team resource
let teamRouter = express.Router()

/**
 * GET /api/teams returns a list of teams in the system
 * Additionally, query parameters can be used to refine the query.
 * @returns list of teams
 * @throws 500 on error
 *
 * Example: GET /api/teams?teamNumber=10
 */
teamRouter.get("/api/teams", isAdmin, getTeams)

function getTeams(req, res) {
	Team.find(req.query)
		.then(teams => {
			return res.json(teams)
		})
		.catch(err => {
			return res.status(c.StatusInternalError).send(err)
		})
}

/**
 * GET /api/teams/:teamNumber returns a single team with the matching teamNumber
 * @returns a single team
 * @throws 404 if team not found, 500 on any other error
 */
teamRouter.get("/api/teams/:teamNumber", isAdmin, getTeamByNumber)

function getTeamByNumber(req, res) {
	Team.findOne({ teamNumber: req.params.teamNumber })
		.then(team => {
			// If team does not exist, return not found
			if (!team) {
				return res.status(c.StatusNotFound).send(c.MessageNotFound)
			}

			return res.json(team)
		})
		.catch(err => {
			return res.status(c.StatusInternalError).send(err)
		})
}

/**
 * POST /api/teams creates a team given a team in the request body
 * Will return error if given team has a teamNumber that already exists,
 * or if the given team does not have a team number.
 * @returns 200 on successful creation
 * @throws 500 on error
 */
teamRouter.post("/api/teams", isAdmin, createTeam)

function createTeam(req, res) {
	// Check if given team has a teamNumber
	let teamNumber = req.body.teamNumber
	if (!teamNumber) {
		return res.status(c.StatusInternalError).send("Missing team number!")
	}

	// Check if team with matching team number already exists, else create new team
	Team.findOne({ teamNumber })
		.then(team => {
			if (team) {
				return res.status(c.StatusInternalError).send("Team with this number already exists")
			}

			let newTeam = new Team(req.body)

			newTeam
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
 * PUT /api/teams/:teamNumber edits the team with the matching team number
 * given the edited values within the requst body.
 * @returns 200 on successful edit
 * @returns 404 on team not found, 500 on any other error
 */
teamRouter.put("/api/teams/:teamNumber", isAdmin, editTeam)

function editTeam(req, res) {
	Team.findOne({ teamNumber: req.params.teamNumber })
		.then(team => {
			// If team does not exist, return not found
			if (!team) {
				return res.status(c.StatusNotFound).send("Team with given team number does not exist")
			}

			// Update team with info in request body and save
			let updatedTeam = Object.assign(team, req.body)

			// HACK: empty lists don't go through, so we have this check
			if (!req.body.parts) {
				team.parts = []
			}
    
			updatedTeam
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

module.exports = teamRouter
