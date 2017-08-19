const Team = require('../../db').Team

const getTeam = (req, res) => {
  Team.find({}).then(teams => {
    res.render('admin-team', { teams })
  })
}

const postTeam = (req, res) => {
  let shokugeki = new Team()
    console.log(req.body)
    console.log(req.body.teamNumber)
    
  shokugeki.teamNumber = req.body.teamNumber
  shokugeki.teamName = req.body.teamName
  shokugeki.parts = []
  shokugeki.members = []
  shokugeki.save()

  res.json({ message: 'post request received' })
}

const deleteTeam = (req, res) => {
  Team.remove().then(err => {
    if (err) console.log(err)

    res.json({ message: 'delete request received' })
  })
}

module.exports = {
  getTeam,
  postTeam,
  deleteTeam
}
