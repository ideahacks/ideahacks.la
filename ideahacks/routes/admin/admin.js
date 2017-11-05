const Feedback = require('../../db').Feedback
const formatDate = require('../../helpers').formatters.formatDate

const getAdmin = (req, res) => {
  Feedback.find()
    .populate('user')
    .then(feedback => {
      for (let f of feedback) {
        f.formattedTimestamp = formatDate(f.timestamp)
      }

      return res.render('admin', { feedback: feedback.reverse() })
    })
}

module.exports = {
  getAdmin
}
