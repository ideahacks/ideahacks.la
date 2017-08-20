const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  major: String,
  school: String,
  year: String,

  // auth fields
  isAdmin: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', UserSchema)
