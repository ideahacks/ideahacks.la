const User = require ('../../db').User // grab User schema from db module

let getUser = (req,res) => {
	User.find({})
	.then(users => {
		res.json(users)
	})
}


let postUser = (req, res) => {
	let trey = new User()
	trey.firstName = 'Trey'
	trey.lastName = 'Crossley'
	trey.save()
}

module.exports = {
	getUser,
	postUser
}
