const User = require('../../db').User

const getLogin = (req, res) => {
  return res.render('login')
}

const postLogin = (req, res) => {
  return res.json({ message: 'post request received' })
}

const getRegistration = (req, res) => {
  return res.render('registration')
}

const postRegistration = (req, res) => {
  // TODO: create new user here
  retrun res.json({ message: 'received post request' })
}

module.exports = {
  getLogin,
  postLogin,
  getRegistration,
  postRegistration
}
