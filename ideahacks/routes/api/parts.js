const Part = require('../../db').Part
const Team = require('../../db').Team

const getParts = (req, res) => {
  Part.find(req.query).then(parts => {
    return res.json(parts)
  })
}

const getPartByName = (req, res) => {
  Part.findOne({ partName: req.params.partName }).then(part => {
    return res.json(part)
  })
}

const handlePartCheckout = (req, res) => {
  // ERROR CHECK: missing action
  if (req.params.action === 'undefined') {
    return res.json({ status: 'failure', message: 'You must specify an action to perform!' })
  }
  Part.findOne({ partName: req.params.partName })
    .then(part => {
      Team.findOne({ teamNumber: req.params.teamNumber })
        .then(team => {
          // ERROR CHECK: non-existant team
          if (!team) {
            return res.json({ status: 'failure', message: "A team with that team number doesn't exist!" })
          }

          // check for duplicate part in team, then modify/shove part into team
          let foundDuplicate = false
          for (let k = 0; k < team.parts.length; k++) {
            let ownedPart = team.parts[k]
            if (ownedPart.partName === part.partName) {
              foundDuplicate = true
              if (req.params.action === 'returning') {
                // ERROR CHECK: trying to return more than the team owns
                if (parseInt(req.params.quantity) > parseInt(ownedPart.stock)) {
                  return res.json({
                    status: 'failure',
                    message: "You can't return more parts than the team currently owns!"
                  })
                } else {
                  ownedPart.stock -= parseInt(req.params.quantity)
                  if (ownedPart.stock === 0) {
                    team.parts.splice(k, 1)
                    k--
                  }
                }
              } else {
                ownedPart.stock += parseInt(req.params.quantity)
              }
              break
            }
          }
          if (!foundDuplicate && req.params.action === 'check-out') {
            team.parts.push({
              partName: part.partName,
              stock: req.params.quantity,
              partType: part.type
            })
          } else if (!foundDuplicate && req.params.action === 'returning') {
            // ERROR CHECK: trying to return a part the team doesn't own
            return res.json({ status: 'failure', message: "The specified team doesn't own this part!" })
          }
          team.save()

          // modify parts stock as needed, then save part
          part.stock =
            req.params.action === 'returning'
              ? parseInt(part.stock) + parseInt(req.params.quantity)
              : parseInt(part.stock) - parseInt(req.params.quantity)
          part.save()

          return res.json({ message: 'success', newStock: part.stock })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

module.exports = {
  getParts,
  getPartByName,
  handlePartCheckout
}
