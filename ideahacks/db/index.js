const dbURI = require('../config').dbURI
const mongoose = require('mongoose')

mongoose.connect(dbURI, {
  useMongoClient: true
})

mongoose.Promise = global.Promise

mongoose.connection.on('error', err => {
  console.log('Mongoose error: ', err)
})

let dummy = 'hello'

module.exports = dummy;
