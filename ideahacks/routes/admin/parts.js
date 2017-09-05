const Part = require('../../db').Part

const getParts = (req, res) => {
  Part.find().then(parts => {
    res.render('admin-parts', { parts })
  })
}

const postParts = (req, res) => {
  //return failure if anything is wrong with the submitted part
  if (
    req.body.partName === '' ||
    !(Number.isInteger(req.body.stock) && req.body.stock >= 0) ||
    req.body.description === '' ||
    req.body.owners === undefined
  ) {
    return res.json({ status: 'failure', message: 'Please fill out all fields of the form!' })
  }
  //end of form failure test

  //Check if part name already exists in database
  Part.find({ partName: req.body.partName }).then(parts => {
    if (parts.length > 0) {
      return res.json({ status: 'failure', message: 'Part already exists' })
    }
  })

  //end of uniqueness check

  //if part passes both tests, then create the part

  let newPart = new Part({
    partName: req.body.partName || '',
    stock: req.body.stock || '',
    description: req.body.description || ' ',
    owners: []
  })
  newPart.save()

  res.json({ message: 'Success! Part has been created' })
  //end of part creation

  //end postParts function
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
