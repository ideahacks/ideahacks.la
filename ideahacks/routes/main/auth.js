const User = require('../../db').User
const passport = require('passport')

const getLogin = (req, res) => {
  return res.render('login')
}

const postLogin = passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/'
})

const getRegistration = (req, res) => {
  return res.render('registration')
}

const postRegistration = (req, res) => {
  let newUser = new User({
    email: req.body.email,
    password: req.body.password
  })
  newUser.save()

  return res.redirect('/')
}

module.exports = {
  getLogin,
  postLogin,
  getRegistration,
  postRegistration
}
