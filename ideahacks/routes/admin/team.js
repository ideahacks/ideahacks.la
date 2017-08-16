const Team = require('../../db').Team

const getTeam = (req, res) => {
  Team.find({}).then(teams => {
    res.render('admin-team', { teams })
  })
}

const postTeam = (req, res) => {
  let shokugeki = new Team()
  shokugeki.teamNumber = 1
  shokugeki.teamName = 'Jeffrey Loves Shokugeki no Soma'
  shokugeki.parts = []
  shokugeki.members = []
  shokugeki.save()

  res.json({ message: 'post request received' })
}

const deleteTeam = (req, res) => {
  Team.remove({})

  res.json({ message: 'delete request received' })
}

module.exports = {
  getTeam,
  postTeam,
  deleteTeam
}
