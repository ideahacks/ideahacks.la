const Team = require('../../db').Team

const getTeams = (req, res) => {
  Team.find({}).then(teams => {
    teams.reverse()
    res.render('admin-team', { teams })
  })
}

const postTeams = (req, res) => {
  if (req.body.teamName === '' || req.body.teamNumber === '') {
    return res.json({
      status: 'failure',
      message: 'Please fill out all fields of the form!'
    })
  }
  Team.find({
    $or: [{ teamName: req.body.teamName }, { teamNumber: req.body.teamNumber }]
  }).then(team => {
    if (team.length === 0) {
      let newTeam = new Team({
        teamName: req.body.teamName || '',
        teamNumber: req.body.teamNumber || '',
        members: [],
        parts: []
      })
      newTeam.save()

      return res.json({
        status: 'success',
        message: 'New team has been added to the database!'
      })
    }
    return res.json({
      status: 'failure',
      message: 'A team with this name or number has already been created!'
    })
  })
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
