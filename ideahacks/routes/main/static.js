let getMain = (req, res) => {
  return res.render('index')
}

let getTeam = (req, res) => {
  return res.render('team')
}

module.exports = {
  getMain,
  getTeam
}
