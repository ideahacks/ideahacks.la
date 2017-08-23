const getDashboard = (req, res) => {
  res.render('dashboard')
}

const getApplication = (req, res) => {
  res.render('application')
}

module.exports = {
  getDashboard,
  getApplication
}
