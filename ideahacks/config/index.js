if (process.env.NODE_ENV === 'production') {
  module.exports = {
    dbURI: process.env.dbURI
  }
} else {
  module.exports = require('./development.json')
}
