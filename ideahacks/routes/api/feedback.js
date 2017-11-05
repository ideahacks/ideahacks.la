const Feedback = require('../../db').Feedback

const postFeedback = (req, res) => {
  let newFeedback = new Feedback({
    content: req.body.content,
    user: req.user._id
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
