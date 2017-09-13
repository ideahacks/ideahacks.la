const Announcement = require('../../db').Announcement
const Part = require('../../db').Part

const getDashboard = (req, res) => {
  Announcement.find().then(announcements => {
    announcements = announcements.reverse()

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
