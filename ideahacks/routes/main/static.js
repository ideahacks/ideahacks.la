const teamData = require('../../db').teamData

const getMain = (req, res) => {
  return res.render('index')
}

const getTeam = (req, res) => {
  return res.render('team', { teamData })
}

const getConfirm = (req, res) => {
  return res.render('confirm')
}

module.exports = {
  getMain,
  getTeam,
  getConfirm
}
