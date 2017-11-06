const User = require('../../db').User

const getUsers = (req, res) => {
  User.find().then(users => {
    return res.json(users)
  })
}

const getUserByEmail = (req, res) => {
  User.findOne({ email: req.params.email }).then(user => {
    return res.json(user)
  })
}

const getUserEmailsByAcceptance = (req, res) => {
  User.find({ applicationStatus: req.params.acceptance }, 'email').then(users => {
    let emailList = users.map(user => user.email).join(', ')
    return res.send(emailList)
  })
}

const changeApplicationStatus = (req, res) => {
  User.findOne({ email: req.params.email }).then(user => {
    user.applicationStatus = req.params.newApplicationStatus
    user.save()

    return res.json({ status: 'success', message: 'Successfully changed application status!' })
  })
}

module.exports = {
  getUsers,
  getUserByEmail,
  getUserEmailsByAcceptance,
  changeApplicationStatus
}
