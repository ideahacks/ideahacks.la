const formatUser = user => {
  if (user.hasTeam) {
    user.hasATeam = true
  }
  user.hasNoTeam = true
  if (user.vehicleNeed) {
    user.doesNeedVehicle = true
  }
  user.doesNotNeedVehicle = true

  let emailSize = user.teammates.length
  if (emailSize === 0) {
    return user
  }

  switch (emailSize) {
    case 4:
      user.teammateEmail4 = user.teammates[3]
    case 3:
      user.teammateEmail3 = user.teammates[2]
    case 2:
      user.teammateEmail2 = user.teammates[1]
    case 1:
      user.teammateEmail1 = user.teammates[0]
  }
  return user
}

module.exports = {
  formatUser
}
