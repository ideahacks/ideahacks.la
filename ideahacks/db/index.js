const dbURI = require('../config').dbURI
const mongoose = require('mongoose')

mongoose.connect(
  dbURI,
  {
    useMongoClient: true
  }
)

mongoose.Promise = global.Promise

mongoose.connection.on('error', err => {
  console.log('Mongoose error: ', err)
})

module.exports = {
  User: require('./User.js'),
  Team: require('./Team.js'),
  Part: require('./Part.js'),
  Feedback: require('./Feedback.js'),
  teamData: require('./data/team.js'),
  sponsorsData: require('./data/sponsors.js')
}
