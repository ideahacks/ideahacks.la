const teamData = require("../../db").teamData
const sponsorsData = require("../../db").sponsorsData
const boxesData = require("../../db").boxesData

const getMain = (req, res) => {
	return res.render("index", { sponsorsData })
}

const getAbout = (req, res) => {
	return res.render("about")
}

const getTeam = (req, res) => {
	return res.render("team", { teamData })
}

const getHistory = (req, res) => {
	return res.render("history")
}

const getVenue = (req, res) => {
	return res.render("venue")
}

const getConfirm = (req, res) => {
	return res.render("confirm")
}

const getPrivacy = (req, res) => {
	return res.render("privacy")
}

const getBoxes = (req, res) => {
	return res.render("boxes", { boxesData })
}

module.exports = {
	getMain,
	getAbout,
	getTeam,
	getHistory,
	getVenue,
	getConfirm,
	getPrivacy,
	getBoxes,
}
