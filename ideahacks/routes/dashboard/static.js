const boxesData = require("../../db").boxesData

const getResources = (req, res) => {
	return res.render("dashboard-resources", { boxesData })
}

module.exports = {
	getResources
}
