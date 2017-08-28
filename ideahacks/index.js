require('./auth')()

module.exports = {
  db: require('./db'),
  routes: require('./routes'),
  session: require('./session'),
  communication: require('./communication')
}
