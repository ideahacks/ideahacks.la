let main = (req, res) => {
  return res.render('index')
}

let login = (req, res) => {
	return res.render('login')
}

module.exports = {
  main,
	login
}
