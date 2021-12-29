$(() => {
	let teamNumber
	let members
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
	})

	$("#users-input").submit(function() {
		let memberEmails = $('textarea[name="members"]')
			.val()
			.split("\n")
		let membersProcessed = 0

		let withTeam = []
		// Global var to store updated members
		members = []
		memberEmails.forEach(email => {
			$.get("/api/users/" + email).then(member => {
				// If the user has a team, save them for confirmation
				if (member.hasTeam) {
					withTeam.push(email)
				}
				
				member.hasTeam = true
				member.teamNumber = teamNumber
				member.teammates = []
				memberEmails.forEach(e => {
					if (e !== email) {
						member.teammates.push(e)
					}
				})
				members.push(member)
			}).catch(err => {
				//Email doesn't exist
				errorHandler(email + " is not a user!")
			})
		})

		if (withTeam.length > 0) {
			// TODO: update HTML
			// Return without updating users or creating team
			return
		}

		return createTeam()
	})
})

function createTeam() {
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

	members.forEach(member => {
		$.ajax({ url: "/api/users" + member.email, type: "PUT", data: member}).catch(err => {
			errorHandler(err)
		})
	})
	
	return successHandler()
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
