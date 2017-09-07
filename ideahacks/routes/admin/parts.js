const Part = require('../../db').Part

const getParts = (req, res) => {
  Part.find().then(parts => {
    res.render('admin-parts', { parts })
  })
}

const postParts = (req, res) => {
  Part.find({ partName: req.body.partName }).then(parts => {
    if (parts.length > 0) {
      return res.json({ status: 'failure', message: 'Part already exists' })
    }

    let newPart = new Part({
      partName: req.body.partName || '',
      stock: req.body.stock || 0,
      description: req.body.description || ' ',
      owners: []
    })
    newPart.save()

    res.json({ status: 'success', message: 'Success! Part has been created' })
  })
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
