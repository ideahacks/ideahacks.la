const setResLocals = (req, res, next) => {
  res.locals = {
    onDashboard: req.baseUrl === '/dashboard',
    onAdmin: req.baseUrl === '/admin',
    onMain: req.baseUrl === ''
  }
  next()
}

module.exports = {
  setResLocals
}
