const getApplication = (req, res) => {
  res.render('application', { user: req.user })
}

const postApplication = (req, res) => {
  for (let key in req.body) {
    req.user[key] = req.body[key]
  }

  // process hasTeam and vehicleNeed
  req.user['hasTeam'] = req.body['hasTeam'] === 'YES' ? true : false
  req.user['vehicleNeed'] = req.body['vehicleNeed'] === 'YES' ? true : false

  req.user.save()

  res.json({ message: 'post request received' })
}

module.exports = {
  getApplication,
  postApplication
}
