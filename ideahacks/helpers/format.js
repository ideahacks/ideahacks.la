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
		case "S":
			user.sizeSmall = true
			break
		case "M":
			user.sizeMedium = true
			break
		case "L":
			user.sizeLarge = true
			break
		case "XL":
			user.sizeXLarge = true
			break
	}

	//FOR KITS//
	switch (user.kitPreferenceOne) {
		case "Motion Add-on":
			user.pref1MotionAddOn = true
			break
		case "Audio + Visual Add-on":
			user.pref1AVAddOn = true
			break
		case "TI Box":
			user.pref1TIBox = true
			break
	}
	switch (user.kitPreferenceTwo) {
		case "Motion Add-on":
			user.pref2MotionAddOn = true
			break
		case "Audio + Visual Add-on":
			user.pref2AVAddOn = true
			break
		case "TI Box":
			user.pref2TIBox = true
			break
	}
	switch (user.kitPreferenceThree) {
		case "Motion Add-on":
			user.pref3MotionAddOn = true
			break
		case "Audio + Visual Add-on":
			user.pref3AVAddOn = true
			break
		case "TI Box":
			user.pref3TIBox = true
			break
	}

	return user
}

module.exports = {
	formatUser
}
