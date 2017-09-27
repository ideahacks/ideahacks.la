const teamData = require('../../db').teamdata

let getMain = (req, res) => {
  return res.render('index')
}

let getTeam = (req, res) => {
  return res.render('team', { teamData })
}

module.exports = {
  getMain,
  getTeam
}
