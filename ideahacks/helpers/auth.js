const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports = {
  isAuthenticated,
  isAdmin
}
