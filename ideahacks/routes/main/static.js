const teamData = require('../../db').teamData
const sponsorsData = require('../../db').sponsorsData

const getMain = (req, res) => {
  return res.render('index', { sponsorsData })
}

const getVenue = (req, res) => {
  return res.render('venue')
}

const getTeam = (req, res) => {
  return res.render('team', { teamData })
}

const getFAQ = (req, res) => {
  return res.render('extended-faq')
}

const getConfirm = (req, res) => {
  return res.render('confirm')
}

module.exports = {
  getMain,
  getVenue,
  getTeam,
  getFAQ,
  getConfirm
}
