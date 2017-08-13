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
}

const deleteUser = (req, res) => {
  User.remove({})

  res.json({ message: 'delete reqest received' })
}

module.exports = {
  getUser,
  postUser,
  deleteUser
}
