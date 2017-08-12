const User = require('../../db').Team

const getTeam = (req, res) => {
    Team.find({})
        .then(teams => {
            res.json(teams)
    })
}

const postTeam = (req, res) => {
    const shokugeki = new Team()
    shokugeki.teamNumber = 1
    shokugeki.teamName = 'Jeffrey Loves Shokugeki no Soma'
    shokugeki.parts = []
    shokugeki.members = []
    shokugeki.save()
    
    res.json({message: "post request received"})
}

module.exports = {
    getTeam,
    postTeam
}