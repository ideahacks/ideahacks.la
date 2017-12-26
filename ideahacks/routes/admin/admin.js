const User = require('../../db').User
const Feedback = require('../../db').Feedback
const formatDate = require('../../helpers').formatters.formatDate

const getAdmin = (req, res) => {
  Feedback.find()
    .populate('user')
    .then(feedback => {
      User.find({ hasApplication: true, isVerified: true }).then(users => {
        // Compile lists of emails for accepted, pending, and rejected users
        let emailLists = users.reduce(
          (lists, user, i) => {
            lists[user.applicationStatus].list.push(user.email)
            return lists
          },
          {
            accepted: { name: 'Accepted', list: [] },
            pending: { name: 'Pending', list: [] },
            rejected: { name: 'Rejected', list: [] }
          }
        )

        let mailingLists = []
        for (let k in emailLists) {
          emailLists[k].list = emailLists[k].list.join(', ')
          mailingLists.push(emailLists[k])
        }

        // Format the timestamps of Feedback objects
        for (let f of feedback) {
          f.formattedTimestamp = formatDate(f.timestamp)
        }

        return res.render('admin', {
          feedback: feedback.reverse(),
          mailingLists
        })
      })
    })
}

module.exports = {
  getAdmin
}
