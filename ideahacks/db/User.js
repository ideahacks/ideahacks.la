const mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    major: String,
    school: String,
    year: String
})

module.exports = mongoose.model('User', UserSchema)
