const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeamSchema = new Schema({
  teamName: String,
  teamNumber: Number,
  parts: [{ partName: String, stock: Number, partType: String }],
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model('Team', TeamSchema)
