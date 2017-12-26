const bcrypt = require('bcrypt-nodejs')

const Announcement = require('../../db').Announcement
const Part = require('../../db').Part
const formatDate = require('../../helpers').formatters.formatDate

const getDashboard = (req, res) => {
  Announcement.find()
    .populate('createdBy', 'firstName lastName')
    .then(announcements => {
      announcements = announcements.reverse()

      for (let ann of announcements) {
        ann.formattedTimestamp = formatDate(ann.timestamp)
      }

      res.render('dashboard-announcements', { announcements })
    })
}

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
  //   'newPassword': ...
  // }
  // and makes the requested changes to the current user

  req.user.firstName = req.body.firstName
  req.user.lastName = req.body.lastName
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
  getDashboard,
  getParts,
  getMe,
  postMe
}
