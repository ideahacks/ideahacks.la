const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const favicon = require('serve-favicon')
const hbs = require('hbs')
const ideahacks = require('./ideahacks')

let app = express()

app.set('port', (process.env.PORT || 3000))
app.set('view engine', 'hbs')

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(ideahacks.routes.mainRouter)
app.use('/admin', ideahacks.routes.adminRouter)
app.use('/api', ideahacks.routes.apiRouter)

module.exports = app
