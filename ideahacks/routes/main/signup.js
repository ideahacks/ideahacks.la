let getLogin = (req, res) => {
  return res.render('login')
}

let getRegistration = (req, res) => {
  return res.render('registration')
}

module.exports = {
  getLogin,
  getRegistration
}
