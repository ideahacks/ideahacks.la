const setResLocals = (req, res, next) => {
	res.locals = {
		onDashboard: req.baseUrl === "/dashboard",
		onAdmin: req.baseUrl === "/admin",
		onMain: req.baseUrl === "",
		authenticated: req.isAuthenticated(),
	}
	next()
}

module.exports = {
	setResLocals,
}
