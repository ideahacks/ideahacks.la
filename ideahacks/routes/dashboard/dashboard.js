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

module.exports = {
  getDashboard,
  getParts
}
