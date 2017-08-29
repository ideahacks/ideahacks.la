const Team = require('../../db').Team
const User = require('../../db').User

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
    console.log(req.body.members)
  User.find({
    email: { $in: [req.body.members] }
  }).then(emails => {
      console.log(emails)
    if (emails.length === 0) {
      return res.json({
        status: 'failure',
        message: 'A user you entered is not in our database!'
      })
    }
  }) 
  Team.find({
    $or: [{ teamName: req.body.teamName }, { teamNumber: req.body.teamNumber }, {members: {$in:[req.body.members]}}]
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
