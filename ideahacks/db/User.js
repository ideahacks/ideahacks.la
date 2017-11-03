const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  // user and application info
  email: String,
  password: String,
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  phone: { type: String, default: '' },
  school: { type: String, default: '' },
  major: { type: String, default: '' },
  year: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  hasTeam: { type: Boolean, default: false },
  teammates: { type: [String], default: [] },
  foodRestrictions: { type: String, default: '' },
  skillsAndExperience: { type: String, default: '' },
  pastHackathonExperience: { type: String, default: '' },
  reasonForParticipation: { type: String, default: '' },
  themeIdea: { type: String, default: '' },
  desiredParts: { type: String, default: '' },
  shirtSize: { type: String, default: 'M' },

  // boolean fields
  hasApplication: { type: Boolean, default: false },
  applicationStatus: { type: String, default: 'pending' },

  // auth fields
  verificationHash: String,
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', UserSchema)
