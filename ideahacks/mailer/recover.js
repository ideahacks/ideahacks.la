const sgMail = require('@sendgrid/mail')
const config = require('../config')

sgMail.setApiKey(config.SENDGRID_API_KEY)

module.exports = (user, type) => {
  const msg = {
    to: user.email,
    from: 'team@ideahacks.la',
    subject: 'IDEA Hacks ' + type + ' recovery',
    html: 'Your IDEA Hacks ' + type + ' is: ' + user[type]
  }

  sgMail.send(msg)
}
