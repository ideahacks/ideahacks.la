const dbURI = require('../config').dbURI
const mongoose = require('mongoose')
const User = require('./User.js')
const Team = require('./Team.js')
const Part = require('./Part.js')
const Announcement = require('./Announcement.js')

mongoose.connect(dbURI, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

mongoose.connection.on('error', err => {
  console.log('Mongoose error: ', err)
})

module.exports = {
  User,
  Team,
  Part,
  Announcement,
  teamData: require('./data/team.js')
}
