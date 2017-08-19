const Part = require('../../db').Part

const getParts = (req, res) => {
  Part.find().then(parts => {
    res.render('admin-parts', { parts })
  })
}

const postParts = (req, res) => {
  let pylon = new Part()
  pylon.partName = 'MUST CONSTRUCT ADDITIONAL'
  pylon.stock = 15
  pylon.description = 'support structure for use in beams'
  pylon.owners = []
  pylon.save()

  res.json({ message: 'Received POST request' })
}

const deleteParts = (req, res) => {
  Part.remove().then(err => {
    if (err) console.log(err)

    res.json({ message: 'Received DELETE request' })
  })
}

module.exports = {
  getParts,
  postParts,
  deleteParts
}
