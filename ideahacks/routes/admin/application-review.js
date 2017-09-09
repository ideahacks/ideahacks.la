const User = require('../../db').User

const getApplicationReview = (req, res) => {
  User.find({ hasApplication: true }).then(users => {
    res.render('admin-application-review.hbs', { applications: users })
  })
}

module.exports = {
  getApplicationReview
}
