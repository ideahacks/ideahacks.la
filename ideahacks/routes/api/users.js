const User = require ('../../db').User // grab User schema from db module

const getUser = (req,res) => {
	User.find({})
	.then(users => {
		res.json(users)
	})
}


const postUser = (req, res) => {
	let trey = new User()
	trey.firstName = 'Trey'
	trey.lastName = 'Crossley'
	trey.save()
}

module.exports = {
	getUser,
	postUser
}
