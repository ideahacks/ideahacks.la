$(() => {
	let teamNumber
	$("#team-submit").submit(function(event) {
		event.stopPropagation()
		teamNumber = $('input[name="team-number"').val()
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
						errorHandler(err)
					})
			})
	})

	$("#users-input").submit(function() {
		let memberEmails = $('textarea[name="members"]')
			.val()
			.split(",")
		var membersProcessed = 0

		memberEmails.forEach(email => {
			$.get("/api/users/" + email)
				.then(member => {
					if (member.hasTeam) {
						return errorHandler("Email " + member.email + " is already associated with a team!")
					} else {
						membersProcessed++
						if (membersProcessed === memberEmails.length) {
							membersProcessed = 0
							memberEmails.forEach(email => {
								//Loop through members to see if each exists
								$.get("/api/users/" + email)
									.then(member => {
										//Check if the member is already part of a team

										member.hasTeam = true
										member.teamNumber = teamNumber
										membersProcessed++

										$.ajax({ url: "/api/users/" + email, type: "PUT", data: member }).catch(err => {
											//deleteTeam(teamNumber);
											return errorHandler(err)
										})

										if (membersProcessed === memberEmails.length) {
											successHandler()
										}
									})
									.catch(err => {
										//Email doesn't exist
										//deleteTeam(teamNumber);
										errorHandler(err)
									})
							})
						}
					}
				})
				.catch(err => {
					//Email doesn't exist
					deleteTeam(teamNumber)
					return errorHandler(err)
				})
		})

		// $.ajax({ url: "/api/teams", type: "PUT", data: team })
		// 	.then(() => {
		// 		//For each member of the team, add the team number to the database
		// 		memberEmails.forEach(email => {
		// 			$.get("/api/users/" + email)
		// 				.then(user => {
		// 					user.hasTeam = true
		// 					user.teamNumber = teamNumber
		// 					$.ajax({ url: "/api/users/" + email, type: "PUT", data: user })
		// 						.catch(err => {
		// 							return errorHandler(err)
		// 						})
		// 					team.
		// 				})
		// 				.catch(err => {
		// 					return errorHandler(err)
		// 				})
		// 		})
		// 		successHandler();
		// 	})
		// 	.catch(err => {
		// 		errorHandler(err)
		// 	})
		// })
	})
})()

function deleteTeam(teamNumber) {
	$.ajax({
		url: "/api/teams",
		type: "DELETE",
		data: { teamNumber: teamNumber }
	})
}

// Attempts to log the given error as well as exits the script
function errorHandler(err) {
	$(".container").html("There was an error processing your request: " + err)
	$(this).hide()

	setTimeout(location.reload.bind(location), 3000)
	// Exits script
	throw new Error(err)
}

// successHandler is the logic that runs when everything doesn't blow up
function successHandler() {
	$(".container").html("Success! Redirecting you in 3 seconds.")
	$(this).hide()

	setTimeout(location.reload.bind(location), 3000)
}
