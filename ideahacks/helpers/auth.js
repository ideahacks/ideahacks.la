const isAuthenticated = (req, res, next) => {
	req.isAuthenticated() ? next() : res.redirect("/login")
}

const isVerified = (req, res, next) => {
	req.isAuthenticated() && req.user.isVerified ? next() : res.redirect("/confirm")
}

const isAdmin = (req, res, next) => {
	req.isAuthenticated() && req.user.isAdmin ? next() : res.redirect("/login")
}

module.exports = {
	isAuthenticated,
	isVerified,
	isAdmin
}
