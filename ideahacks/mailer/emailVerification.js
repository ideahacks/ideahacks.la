const sgMail = require('@sendgrid/mail')
const config = require('../config')

sgMail.setApiKey(config.SENDGRID_API_KEY)

module.exports = user => {
  const msg = {
    to: user.email,
    from: 'team@ideahacks.la',
    subject: 'IDEA Hacks email verification',
    html:
      'Welcome to IDEA Hacks! Please confirm your email address by clicking the following link: <a target="_blank" href="' +
      config.host +
      '/verify/' +
      user.verificationHash +
      '">' +
      'Verify' +
      '</a>'
  }

  sgMail.send(msg)
}
