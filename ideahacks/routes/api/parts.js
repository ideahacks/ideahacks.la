const Part = require('../../db').Part

const getParts = (req, res) => {
  Part.find().then(parts => {
    return res.json(parts)
  })
}

const getPartsByName = (req, res) => {
  Part.findOne({ partName: req.params.partName }).then(part => {
    return res.json(part)
  })
}

module.exports = {
  getParts,
  getPartsByName
}
