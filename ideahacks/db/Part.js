const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PartSchema = new Schema({
  partName: String,
  stock: Number,
  description: String,
  owners: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  type: { type: String, default: 'returnable' },
  manufacturer: { type: String, default: '' },
  manufacturerPartNumber: { type: String, default: '' },
  datasheet: { type: String, default: '' }
})

module.exports = mongoose.model('Part', PartSchema)
