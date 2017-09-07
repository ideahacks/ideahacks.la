const setResLocals = (req, res, next) => {
  res.locals = {
    onDashboard: req.baseUrl === '/dashboard',
    onAdmin: req.baseUrl === '/admin'
  }
  next()
}

module.exports = {
  setResLocals
}
