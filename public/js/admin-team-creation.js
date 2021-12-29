$(() => {
	let teamNumber
	$("#team-submit").submit(function(event) {
		event.stopPropagation()
		teamNumber = $('input[name="team-number"]').val()
		if (isNaN(teamNumber)) {
			return errorHandler("Must give a valid team number!")
		}
		//Create the team
		//Check if team number is already taken
		$.get("/api/teams/" + teamNumber)
			//Team already exists
			.then(team => {
				return errorHandler("Team number already exists!")
			})
			//Team doesn't exist yet
			.catch(() => {
				team = {
					teamNumber: teamNumber
				}
				//Creates team
				$.ajax({ url: "/api/teams", type: "POST", data: team })
					.then(() => {
						$("#team-input").hide()
						$("#users-input").show()
					})
					.catch(err => {
						errorHandler(err, teamNumber)
					})
			})
	})

	$("#users-input").submit(function() {
		let memberEmails = $('textarea[name="members"]')
			.val()
			.split("\n")
		var membersProcessed = 0

		memberEmails.forEach(email => {
			$.get("/api/users/" + email)
				.then(member => {
					if (member.hasTeam) {
						return errorHandler("Email " + member.email + " is already associated with a team!", teamNumber)
					} else {
						membersProcessed++
						if (membersProcessed === memberEmails.length) {
							membersProcessed = 0
							memberEmails.forEach(email => {
								//Loop through members to see if each exists
								$.get("/api/users/" + email)
									.then(member => {
										//Check if the member is already part of a team
										try {
											member.hasTeam = true
											member.teamNumber = teamNumber
											member.teammates = []
											memberEmails.forEach(e => {
												if (e !== email) {
													member.teammates.push(e)
												}
											})
											membersProcessed++
										} catch (err) {
											return errorHandler(email + " is not a user!", teamNumber)
										}

										$.ajax({ url: "/api/users/" + email, type: "PUT", data: member }).catch(err => {
											return errorHandler(err, teamNumber)
										})

										if (membersProcessed === memberEmails.length) {
											successHandler()
										}
									})
									.catch(err => {
										//Email doesn't exist
										errorHandler(email + " is not a user!", teamNumber)
									})
							})
						}
					}
				})
				.catch(err => {
					//Email doesn't exist
					return errorHandler(email + " is not a user!", teamNumber)
				})
		})
	})
})

function deleteTeam(teamNumber) {
	$.ajax({
		url: "/api/teams",
		type: "DELETE",
		data: { teamNumber: teamNumber }
	})
}

// Attempts to log the given error as well as deletes the team that was starting
// to be formed
function errorHandler(err, teamNumber) {
	$(".container").html("There was an error processing your request: " + err)
	$(this).hide()

	if (teamNumber) {
		deleteTeam(teamNumber)
	}

	setTimeout(location.reload.bind(location), 3000)
}

// successHandler is the logic that runs when everything doesn't blow up
function successHandler() {
	$(".container").html("Success! Redirecting you in 3 seconds.")
	$(this).hide()

	setTimeout(location.reload.bind(location), 3000)
}
