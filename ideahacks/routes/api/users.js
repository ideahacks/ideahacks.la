const User = require('../../db').User

const getUsers = (req, res) => {
  User.find().then(users => {
    return res.json(users)
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

const deleteUsers = (req, res) => {
  User.remove().then(err => {
    if (err) console.log(err)

    return res.json({ message: 'Received DELETE requets' })
  })
}

module.exports = {
  getUsers,
  postUsers,
  deleteUsers
}
