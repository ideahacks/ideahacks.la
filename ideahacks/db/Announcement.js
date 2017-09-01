const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnnouncementSchema = new Schema({
  header: { type: String, default: '' },
  body: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  category: { type: String, default: 'general' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Announcement', AnnouncementSchema)
