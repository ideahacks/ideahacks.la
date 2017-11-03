const formatUser = user => {
  if (user.hasTeam) {
    user.hasATeam = true
  } else {
    user.hasNoTeam = true
  }

  let numberOfTeammates = user.teammates.length

  switch (numberOfTeammates) {
    case 4:
      user.teammateEmail4 = user.teammates[3]
    case 3:
      user.teammateEmail3 = user.teammates[2]
    case 2:
      user.teammateEmail2 = user.teammates[1]
    case 1:
      user.teammateEmail1 = user.teammates[0]
    default:
      break
  }

  switch (user.shirtSize) {
    case 'S':
      user.sizeSmall = true
      break
    case 'M':
      user.sizeMedium = true
      break
    case 'L':
      user.sizeLarge = true
      break
    case 'XL':
      user.sizeXLarge = true
      break
  }

  return user
}

const formatDate = date => {
  let d = date
  const dayList = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
  const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  let meridianSuffix = d.getHours() - 12 > 0 ? 'AM' : 'PM'
  let hours = d.getHours() % 12 === 0 ? 12 : d.getHours() % 12

  return [
    dayList[d.getDay()],
    monthList[d.getMonth()] + ',',
    d.getDate(),
    hours + ':' + d.getMinutes() + meridianSuffix
  ].join(' ')
}

module.exports = {
  formatUser,
  formatDate
}
