const Announcement = require('../../db').Announcement

const getDashboard = (req, res) => {
  Announcement.find().then(announcements => {
    announcements = announcements.reverse()

    res.render('dashboard-announcements', { announcements })
  })
}

module.exports = {
  getDashboard
}
