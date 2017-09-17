const setResLocals = (req, res, next) => {
  res.locals = {
    onDashboard: req.baseUrl === '/dashboard',
    onAdmin: req.baseUrl === '/admin',
    onMainOrTeam:
      (req.path === '/' || req.path === '/team') && req.baseUrl !== '/dashboard' && req.baseUrl !== '/admin',
    onMain: req.path === '/' && req.baseUrl !== '/dashboard' && req.baseUrl !== '/admin'
  }
  next()
}

module.exports = {
  setResLocals
}
