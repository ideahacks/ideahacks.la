const bcrypt = require('bcrypt-nodejs')

const Part = require('../../db').Part

const getParts = (req, res) => {
  Part.find().then(parts => {
    res.render('dashboard-parts', { parts })
  })
}

const getMe = (req, res) => {
  res.render('me', { user: req.user })
}

const postMe = (req, res) => {
  // POST /dashboard/me handler that takes a POST request that looks like:
  // {
  //   'firstName': ...,
  //   'lastName': ...,
  //   'email': ...,
  //   'newPassword': ...
  // }
  // and makes the requested changes to the current user

  if (req.body.firstName) {
    req.user.firstName = req.body.firstName
  }

  if (req.body.lastName) {
    req.user.lastName = req.body.lastName
  }

  if (req.body.email) {
    req.user.email = req.body.email
  }

  bcrypt.hash(req.body['newPassword'], null, null, (err, hashedPassword) => {
    if (err) console.log(err)

    // Ignore empty password change request
    if (req.body.newPassword !== '') {
      req.user.password = hashedPassword
    }
    req.user.save()

    return res.json({ status: 'success', message: 'Successfully saved profile changes.' })
  })
}

module.exports = {
  getParts,
  getMe,
  postMe
}
