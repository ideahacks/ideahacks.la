if (process.env.NODE_ENV === 'production') {
  module.exports = {
    dbURI: process.env.dbURI,
    sessionSecret: process.env.sessionSecret,
    host: process.env.host,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
  }
} else {
  module.exports = require('./development.json')
}
