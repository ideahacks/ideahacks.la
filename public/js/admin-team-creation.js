let teamNumber
let members
let withTeam
let withTeamNumbers
$(() => {
	$("#team-number").submit(function (event) {
		event.stopPropagation()
		teamNumber = $('input[name="team-number"]').val()
		if (isNaN(teamNumber)) {
			return errorHandler("Must give a valid team number!")
		}
		//Create the team
		//Check if team number is already taken
		$.get("/api/teams/" + teamNumber)
			//Team already exists
			.then((team) => {
				return errorHandler("Team number already exists!")
			})
			.catch(() => {
				$("#team-number").hide()
				$("#members").show()
			})
	})

	$("#members").submit(function () {
		let memberEmails = $('textarea[name="members"]').val().trim()
		if (memberEmails.includes("\n")) {
			memberEmails = memberEmails.split("\n")
		} else {
			memberEmails = [memberEmails]
		}

		let memberPromises = []
		memberEmails.forEach((email) => {
			memberPromises.push($.get("/api/users/" + email))
		})

		members = []
		withTeam = []
		withTeamNumbers = []
		let curEmail = ""
		$.when(...memberPromises)
			.then(function (...memberResponses) {
				for (let i = 0; i < memberPromises.length; i++) {
					if (memberPromises.length !== 1) {
						member = memberResponses[i][0]
					} else {
						member = memberResponses[0]
					}
					curEmail = memberEmails[i]
					// If the user has a team, save them for confirmation If the
					// user has a team number of -1, then they had teammates on
					// their application, but haven't formally made a team yet
					if (member.hasTeam && member.teamNumber !== -1) {
						withTeam.push(member.email)
						withTeamNumbers.push(member.teamNumber)
					}

					member.hasTeam = true
					member.teamNumber = teamNumber
					member.teammates = []
					memberEmails.forEach((e) => {
						if (e !== member.email) {
							member.teammates.push(e)
						}
					})
					members.push(member)
				}

				if (withTeam.length > 0) {
					$("#members").hide()
					$("#with-team").html(withTeam.join(", "))
					$("#confirm").show()
					// Return without updating users or creating team
					return
				}

				return createTeam()
			})
			.catch((err) => {
				//Email doesn't exist
				errorHandler(curEmail + " is not a user!")
			})
	})

	$("#confirm").submit(function () {
		// Remove any users already on teams from their old teammates' team data
		let oldTeammatePromises = []
		// Get a list of users on each old team
		withTeamNumbers.forEach((number) => {
			oldTeammatePromises.push($.get("/api/users/emails?teamNumber=" + number))
		})
		$.when(...oldTeammatePromises).then(function (...oldTeammateResponses) {
			let teammateUpdatePromises = []
			for (let i = 0; i < oldTeammatePromises.length; i++) {
				let userEmail = withTeam[i]
				let oldMembers
				if (oldTeammatePromises.length !== 1) {
					oldMembers = oldTeammateResponses[i][0]
				} else {
					oldMembers = oldTeammateResponses[0]
				}

				if (oldMembers.includes(",")) {
					oldMembers = oldMembers.split(", ")
				} else {
					oldMembers = [oldMembers]
				}

				let userIndex = oldMembers.indexOf(userEmail)
				let oldTeammates
				if (userIndex > -1) {
					oldMembers.splice(userIndex, 1)
				}
				oldTeammates = oldMembers

				// Get the old teammate's data and prepare to remove the user
				// from their teammate list
				if (oldTeammates) {
					oldTeammates.forEach((teammate) => {
						$.get("/api/users/" + teammate)
							.then((teammateData) => {
								let toRemove = teammateData.teammates.indexOf(userEmail)
								if (toRemove > -1) {
									teammateData.teammates.splice(toRemove, 1)
								}
								teammateUpdatePromises.push(
									$.ajax({
										url: "/api/users/" + teammateData.email,
										type: "PUT",
										data: teammateData,
									})
								)
							})
							.catch((err) => errorHandler(err))
					})
				}
			}

			$.when(...teammateUpdatePromises)
				.then(function (...updateResponses) {
					// At this point, all references to any of the users being in
					// their old teams have been removed, so we're clear to create
					// the new team
					return createTeam()
				})
				.catch((err) => errorHandler(err))
		})
	})
})

function createTeam() {
	team = {
		teamNumber: teamNumber,
	}

	$.ajax({ url: "/api/teams", type: "POST", data: team })
		.then(() => {
			members.forEach((member) => {
				$.ajax({ url: "/api/users/" + member.email, type: "PUT", data: member }).catch((err) => {
					errorHandler(err)
				})
			})
			return successHandler()
		})
		.catch((err) => {
			errorHandler(err)
		})
}

function deleteTeam() {
	$.ajax({
		url: "/api/teams",
		type: "DELETE",
		data: { teamNumber: teamNumber },
	})
}

// Attempts to log the given error as well as deletes the team that was starting
// to be formed
function errorHandler(err) {
	$(".container").html("There was an error processing your request: " + err)
	$(this).hide()

	if (teamNumber) {
		deleteTeam()
	}

	setTimeout(location.reload.bind(location), 3000)

	// Break out of the script
	throw new Error(err)
}

// successHandler is the logic that runs when everything doesn't blow up
function successHandler() {
	$(".container").html("Success! Redirecting you in 3 seconds.")
	$(this).hide()

	setTimeout(location.reload.bind(location), 3000)
}
