let main = (req, res) => {
  return res.render('index')
}

let login = (req, res) => {
  return res.render('login.html')
}

module.exports = {
  main,
  login
}
