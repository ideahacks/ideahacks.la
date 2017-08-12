const dbURI = require('../config').dbURI
const mongoose = require('mongoose')
const User = require('./User.js')
const Team = require('./Team.js')

mongoose.connect(dbURI, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

mongoose.connection.on('error', err => {
  console.log('Mongoose error: ', err)
})

module.exports = {
    User,
    Team
}