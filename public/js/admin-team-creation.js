let teamNumber
let members
$(() => {
	$("#team-number").submit(function(event) {
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
			.catch(() => {
				$("#team-number").hide()
				$("#members").show()
			})
	})

	$("#members").submit(function() {
		let memberEmails = $('textarea[name="members"]')
			.val()
			.split("\n")
		
		memberPromises = []
		memberEmails.forEach(email => {
			memberPromises.push($.get("/api/users/" + email))
		})

		members = []
		let withTeam = []
		$.when(...memberPromises)
			.done(function(...memberResponses) {
				memberResponses.forEach(memberRes => {
					member = memberRes[0]
					// If the user has a team, save them for confirmation
					if (member.hasTeam) {
						withTeam.push(member.email)
					}

					member.hasTeam = true
					member.teamNumber = teamNumber
					member.teammates = []
					memberEmails.forEach(e => {
						if (e !== member.email) {
							member.teammates.push(e)
						}
					})
					members.push(member)
				})

				if (withTeam.length > 0) {
					$("#members").hide()
					$("#with-team").html(withTeam.join(", "))
					$("#confirm").show()
					// Return without updating users or creating team
					return
				}

				return createTeam()
			})
			.catch(err => {
				//Email doesn't exist
				errorHandler(email + " is not a user!")
			})
	})

	$("#confirm").submit(createTeam)
})

function createTeam() {
	team = {
		teamNumber: teamNumber
	}

	$.ajax({ url: "/api/teams", type: "POST", data: team })
		.then(() => {
			members.forEach(member => {
				$.ajax({ url: "/api/users/" + member.email, type: "PUT", data: member }).catch(err => {
					errorHandler(err)
				})
			})
			return successHandler()
		})
		.catch(err => {
			errorHandler(err)
		})
}

function deleteTeam() {
	$.ajax({
		url: "/api/teams",
		type: "DELETE",
		data: { teamNumber: teamNumber }
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
