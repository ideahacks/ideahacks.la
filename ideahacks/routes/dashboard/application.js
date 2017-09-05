const formatUser = require('../../helpers').userFunctions.formatUser

const getApplication = (req, res) => {
  req.user = formatUser(req.user)
  res.render('application', { user: req.user })
}

const postApplication = (req, res) => {
  if (req.body.teammates === undefined && req.body.hasTeam === 'YES') {
    return res.json({
      status: 'failure',
      message: 'You cannot have a team without teammates!'
    })
  } else if (req.body.teammates !== undefined && req.body.teammates.length >= 1 && req.body.hasTeam === 'NO') {
    return res.json({
      status: 'failure',
      message: 'You have a team!'
    })
  }
  for (let key in req.body) {
    req.user[key] = req.body[key]
  }

  // process hasTeam and vehicleNeed
  req.user['hasTeam'] = req.body['hasTeam'] === 'YES'
  req.user['vehicleNeed'] = req.body['vehicleNeed'] === 'YES'

  req.user.hasApplication = true

  req.user.save()

  return res.json({
    status: 'success',
    message: 'You have sucessfully submitted!'
  })
}

module.exports = {
  getApplication,
  postApplication
}
