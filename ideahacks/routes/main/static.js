const teamData = require('../../db').teamData
const sponsorsData = require('../../db').sponsorsData

const getMain = (req, res) => {
  return res.render('index', { sponsorsData })
}

const getTeam = (req, res) => {
  return res.render('team', { teamData })
}

const getHistory = (req, res) => {
  return res.render('history')
}

const getConfirm = (req, res) => {
  return res.render('confirm')
}

module.exports = {
  getMain,
  getTeam,
  getHistory,
  getConfirm
}
