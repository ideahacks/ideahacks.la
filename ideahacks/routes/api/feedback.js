const Feedback = require('../../db').Feedback

const postFeedback = (req, res) => {
  // Calculate a PST timestamp
  let date = new Date()
  let utc = new Date(date.toUTCString())
  utc.setHours(utc.getHours() - 8)
  let pst = new Date(utc)

  let newFeedback = new Feedback({
    content: req.body.content,
    user: req.user._id,
    timestamp: pst
  })

  newFeedback.save()

  return res.json({
    status: 'success',
    message: 'Thanks for submitting your feedback!'
  })
}

module.exports = {
  postFeedback
}
