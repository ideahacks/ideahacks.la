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

const getAcceptedUsers = (req, res) => {
  var acceptedUsers = []
  User.find({ applicationStatus: 'accepted' }).then(accepted => {
    accepted.forEach(function(elem) {
      acceptedUsers.push(elem.email)
    })
    return res.send(acceptedUsers.join(', '))
  })
}

const getWaitlistedUsers = (req, res) => {
  var waitlistedUsers = []
  User.find({ applicationStatus: 'waitlisted' }).then(waitlist => {
    waitlist.forEach(function(elem) {
      waitlistedUsers.push(elem.email)
    })
    return res.send(waitlistedUsers.join(', '))
  })
}

const getRejectedUsers = (req, res) => {
  var rejectedUsers = []
  User.find({ applicationStatus: 'rejected' }).then(rejected => {
    rejected.forEach(function(elem) {
      rejectedUsers.push(elem.email)
    })
    return res.send(rejectedUsers.join(', '))
  })
}

const postUsers = (req, res) => {
  let newUser = new User({
    firstName: 'Trey',
    lastName: 'Crossley',
    email: 'jeffschan97@gmail.com',
    password: 'jeffrey'
  })
  newUser.save()

  return res.json({ message: 'Received POST request' })
}

const changeApplicationStatus = (req, res) => {
  User.findOne({ email: req.params.email }).then(user => {
    user.applicationStatus = req.params.newApplicationStatus
    user.save()

    return res.json({ status: 'success', message: 'Successfully changed application status!' })
  })
}

const deleteUsers = (req, res) => {
  User.remove().then(err => {
    if (err) console.log(err)

    return res.json({ message: 'Received DELETE requets' })
  })
}

module.exports = {
  getUsers,
  getUserByEmail,
  getAcceptedUsers,
  getWaitlistedUsers,
  getRejectedUsers,
  postUsers,
  changeApplicationStatus,
  deleteUsers
}
