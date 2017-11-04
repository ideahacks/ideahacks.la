const Announcement = require('../../db').Announcement
const formatDate = require('../../helpers').formatters.formatDate

const getAnnouncements = (req, res) => {
  Announcement.find()
    .populate('createdBy', 'firstName lastName')
    .then(announcements => {
      announcements = announcements.reverse()

      for (let ann of announcements) {
        ann.formattedTimestamp = formatDate(ann.timestamp)
      }

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

const deleteOneAnnouncement = (req, res) => {
  //access id in the route by using req.params.id
  Announcement.remove({ _id: req.params.id }, err => {
    if (err) {
      console.log(err)
      return res.json({
        status: 'failure',
        message: 'Failed to delete announcement from database!'
      })
    } else {
      return res.json({
        status: 'success',
        message: req.params.id + ' has been deleted.'
      })
    }
  })
}

module.exports = {
  getAnnouncements,
  postAnnouncements,
  nukeAnnouncements,
  deleteOneAnnouncement
}
