const Feedback = require('../../db').Feedback // import your Feedback schema

const postFeedback = (req, res) => {
  // creates a new Feedback object using data sent in the post request
  let newFeedback = new Feedback({
    content: req.body.content,
    user: req.user._id
  })
  newFeedback.save() // saves the object into the database

  return res.json({
    status: 'success',
    message: 'Thanks for submitting your feedback!'
  })
}

// export your function
module.exports = {
  postFeedback
}
