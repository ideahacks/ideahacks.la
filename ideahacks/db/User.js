var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    major: String,
    school: String,
    year: String
})

module.exports = mongoose.model('User', userSchema)
