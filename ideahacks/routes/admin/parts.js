const Part = require('../../db').Part

const getParts = (req, res) => {
  Part.find().then(parts => {
    res.render('admin-parts', { parts })
  })
}

const postParts = (req, res) => {
  let pylon = new Part({
    partName: req.body.partName || '',
    stock: req.body.stock || '',
    description: req.body.description || ' ',
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
