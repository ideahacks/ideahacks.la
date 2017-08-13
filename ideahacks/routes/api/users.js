const User = require('../../db').User

const getUser = (req, res) => {
  User.find({}).then(users => {
    res.json(users)
  })
}

const postUser = (req, res) => {
  let trey = new User()
  trey.firstName = 'Trey'
  trey.lastName = 'Crossley'
  trey.save()

  res.json({ message: 'Received POST request' })
}

const deleteUser = (req, res) => {
  User.remove({})

  res.json({ message: 'Received DELETE requets' })
}

module.exports = {
  getUser,
  postUser,
  deleteUser
}
