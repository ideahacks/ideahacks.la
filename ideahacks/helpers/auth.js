const isAuthenticated = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect('/login')
}

const isAdmin = (req, res, next) => {
  req.isAuthenticated() && req.user.isAdmin ? next() : res.redirect('/login')
}

module.exports = {
  isAuthenticated,
  isAdmin
}
