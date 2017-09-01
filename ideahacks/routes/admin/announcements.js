const Announcement = require('../../db').Announcement

const getAnnouncements = (req, res) => {
  Announcement.find().then(announcements => {
    announcements = announcements.reverse()

    return res.render('admin-announcements', { announcements })
  })
}

const postAnnouncements = (req, res) => {
  let newAnnouncement = new Announcement({
    header: req.body.header,
    body: req.body.body,
    createdBy: req.user._id
  })
  newAnnouncement.save()

  return res.json({ status: 'success', message: 'Successfully created new announcement!' })
}

const nukeAnnouncements = (req, res) => {
  Announcement.remove().then(err => {
    if (err) console.log(err)

    return res.json({ message: 'received announcement delete request' })
  })
}

module.exports = {
  getAnnouncements,
  postAnnouncements,
  nukeAnnouncements
}
