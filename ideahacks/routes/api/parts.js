const Part = require('../../db').Part

const getParts = (req, res) => {
  Part.find().then(parts => {
    return res.json(parts)
  })
}

module.exports = {
  getParts
}
