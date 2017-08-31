const Team = require('../../db').Team
const User = require('../../db').User

const getTeams = (req, res) => {
  Team.find({}).then(teams => {
    teams.reverse()
    res.render('admin-team', { teams })
  })
}

const postTeams = (req, res) => {
  if (req.body.teamName === '' || req.body.teamNumber === '' || req.body.members === undefined) {
    return res.json({
      status: 'failure',
      message: 'Please fill out all fields of the form!'
    })
  }

  Team.find()
    .populate('members')
    .then(teams => {
      for (let team of teams) {
        if (team.teamName === req.body.teamName || team.teamNumber.toString() === req.body.teamNumber) {
          return res.json({
            status: 'failure',
            message: 'A team with this team name or number already exists!'
          })
        }
        for (let user of team.members) {
          if (req.body.members.indexOf(user.email) != -1) {
            return res.json({
              status: 'failure',
              message: user.email + ' has already been taken by team #' + team.teamNumber
            })
          }
        }
      }
      return User.find({
        email: { $in: req.body.members }
      })
        .then(users => {
          let tempEmails = req.body.members
          for (let user of users) {
            let index = tempEmails.indexOf(user.email)
            if (index !== -1) {
              tempEmails.splice(index, 1)
            }
          }
          if (tempEmails.length > 0) {
            return res.json({
              status: 'failure',
              message: 'The emails ' + tempEmails.join(', ') + ' are not within our database!'
            })
          }
          let memberIds = []
          for (let user of users) {
            memberIds.push(user._id)
          }

          let newTeam = new Team({
            teamName: req.body.teamName || '',
            teamNumber: req.body.teamNumber || '',
            members: memberIds,
            parts: []
          })
          newTeam.save()

          return res.json({
            status: 'success',
            message: 'New team has been added to the database!'
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
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
