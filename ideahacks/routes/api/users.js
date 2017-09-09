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
  postUsers,
  changeApplicationStatus,
  deleteUsers
}
