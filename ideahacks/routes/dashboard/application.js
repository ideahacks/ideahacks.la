const formatUser = require('../../helpers').formatters.formatUser;

const getApplication = (req, res) => {
  req.user = formatUser(req.user);
  res.render('dashboard-application', { user: req.user });
};

const postApplication = (req, res) => {
  if (req.body.teammates === undefined && req.body.hasTeam === 'YES') {
    return res.json({
      status: 'failure',
      message: 'You cannot have a team without teammates!'
    });
  } else if (
    req.body.teammates !== undefined &&
    req.body.teammates.length >= 1 &&
    req.body.hasTeam === 'NO'
  ) {
    return res.json({
      status: 'failure',
      message: 'You have a team!'
    });
  }

  let oldHasApplicationStatus = req.user.hasApplication;
  for (let key in req.body) {
    req.user[key] = req.body[key];
  }

  // process hasTeam
  req.user['hasTeam'] = req.body['hasTeam'] === 'YES';
  req.user['teammates'] = req.body.teammates ? req.body.teammates : [];

  if (oldHasApplicationStatus === true) {
    req.user.hasApplication = true;
  } else if (
    oldHasApplicationStatus === false &&
    req.body.hasApplication === 'true'
  ) {
    req.user.hasApplication = true;
  }
  req.user.save();

  if (req.body.hasApplication === 'false') {
    return res.json({
      status: 'success',
      message: 'You have sucessfully saved!'
    });
  } else {
    return res.json({
      status: 'success',
      message: 'You have sucessfully submitted!'
    });
  }
};

module.exports = {
  getApplication,
  postApplication
};
