const Team = require('../../db').Team

const getTeams = (req, res) => {
  Team.find({}).then(teams => {
      console.log(teams)
    res.render('admin-team', { teams })
  })
}

const postTeams = (req, res) => {
  let newTeam = new Team()
  console.log(req.body)

  newTeam.teamName = req.body.teamName || ''
  newTeam.teamNumber = req.body.teamNumber || ''
  newTeam.members = []
  newTeam.parts = []
  newTeam.save()

  res.json({ message: 'post request received' })
}

const deleteTeams = (req, res) => {
  Team.remove().then(err => {
    if (err) console.log(err)

    res.json({ message: 'delete request received' })
  })
}

module.exports = {
  getTeams,
  postTeams,
  deleteTeams
}
