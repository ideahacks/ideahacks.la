const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const ideahacks = require('./ideahacks')

let app = express()

app.set('port', (process.env.PORT || 3000))

app.use(express.static(path.join(__dirname, 'views')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(ideahacks.routes.mainRouter)

module.exports = app
