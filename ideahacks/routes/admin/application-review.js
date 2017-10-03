const User = require('../../db').User

const getApplicationReview = (req, res) => {
  User.find({ hasApplication: true }).then(users => {
    let numberApplications = users.length
    let numberAccepted = 0
    let numberRejected = 0
    let numberPending = 0
    for (let user of users) {
      if (user.applicationStatus === 'accepted') numberAccepted++
      else if (user.applicationStatus === 'pending') numberPending++
      else if (user.applicationStatus === 'rejected') numberRejected++
    }

    res.render('admin-application-review.hbs', {
      applications: users,
      numberApplications,
      numberAccepted,
      numberRejected,
      numberPending
    })
  })
}

module.exports = {
  getApplicationReview
}
