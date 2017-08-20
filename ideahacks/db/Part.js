const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PartSchema = new Schema({
  partName: String,
  stock: Number,
  description: String,
  owners: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
})

module.exports = mongoose.model('Part', PartSchema)