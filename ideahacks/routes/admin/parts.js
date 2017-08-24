const Part = require('../../db').Part

const getParts = (req, res) => {
  Part.find().then(parts => {
    res.render('admin-parts', { parts })
  })
}

const postParts = (req, res) => {
  let pylon = new Part({
    partName: 'MUST CONSTRUCT ADDITION',
    stock: 15,
    description: 'support structure for use in beams',
    owners: []
  })
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
