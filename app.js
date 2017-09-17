const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const favicon = require('serve-favicon')
const hbs = require('hbs')
const passport = require('passport')
const hbsutils = require('hbs-utils')(hbs)
const ideahacks = require('./ideahacks')

let app = express()

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'hbs')
hbsutils.registerPartials(path.join(__dirname, '/views/partials'))
hbsutils.registerWatchedPartials(path.join(__dirname, '/views/partials'))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(ideahacks.session)
app.use(passport.initialize())
app.use(passport.session())

app.use(ideahacks.routes.mainRouter)
app.use('/admin', ideahacks.routes.adminRouter)
app.use('/api', ideahacks.routes.apiRouter)
app.use('/dashboard', ideahacks.routes.dashboardRouter)
app.use((req, res) => {
  res.status(404).render('error', { status: res.statusCode })
})
app.use((err, req, res, next) => {
  if (err) console.log(err)
  res.status(500).render('error', { status: res.statusCode })
})

module.exports = app
