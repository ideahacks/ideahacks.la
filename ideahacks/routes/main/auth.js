const User = require('../../db').User
const passport = require('passport')
const bcrypt = require('bcrypt')

const getLogin = (req, res) => {
  return res.render('login')
}

const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)

    if (!user) return res.json({ status: 'failure', message: 'Invalid email or password!' })

    req.login(user, err => {
      if (err) return next(err)

      return res.json({ status: 'success', message: 'Successfully logged in!' })
    })
  })(req, res, next)
}

const getRegistration = (req, res) => {
  return res.render('registration')
}

const postRegistration = (req, res, next) => {
  if (req.body.password !== req.body.passwordConfirm) {
    return res.json({ status: 'failure', message: 'Your passwords have to match!' })
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) return res.json({ status: 'failure', message: 'A user with this username already exists!' })

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) console.log(err)

      let newUser = new User({
        email: req.body.email,
        password: hashedPassword
      })
      newUser.save()

      return res.json({ status: 'success', message: 'Successfully registered new user!' })
    })
  })
}

const getLogout = (req, res) => {
  req.logout()
  res.redirect('/login')
}

module.exports = {
  getLogin,
  postLogin,
  getRegistration,
  postRegistration,
  getLogout
}
