var mongoose = require('mongoose')
const dbURI = require('../config').dbURI

mongoose.connect(dbURI)
let dummy = 'hello'
module.exports = dummy;