let main = (req, res) => {
  return res.render('index')
}

let team = (req, res) => {
  return res.render('team')
}

module.exports = {
  main,
  team
}
