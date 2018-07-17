const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

const filePath = path.join(__dirname, 'parts.csv')
const dbURI = require('../../config').dbURI
const Part = require('../Part.js')

mongoose.connect(
  dbURI,
  {
    useMongoClient: true
  }
)

mongoose.Promise = global.Promise

mongoose.connection.on('error', err => {
  console.log('Mongoose error: ', err)
})

fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
  if (err) console.log(err)

  let splitData = data.split('\r\n')
  let skippedFirstLine = false
  for (let line of splitData) {
    if (!skippedFirstLine) {
      skippedFirstLine = true
      continue
    }

    let splitLine = line.split(',')
    console.log(splitLine[3])
    let newPart = new Part({
      partName: splitLine[2],
      stock: splitLine[3],
      description: splitLine[1],
      type: splitLine[4] === 'Consumable' ? 'consumable' : 'must return',
      manufacturer: splitLine[5],
      manufacturerPartNumber: splitLine[6],
      datasheet: splitLine[7]
    })

    newPart.save()
  }
})
