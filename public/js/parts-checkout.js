$(() => {
	// When checkout is selected, display next step
	// $("#checkout-prompt").click(function() {
	// 	$(".checkin").hide()
	// 	$("#barcode-input").show()
	// 	$(this).hide()
	// 	$("#team-input").show()

	// 	$("#out-button").show()
	// })

	// // When checkin is selected, display next step
	// $("#checkin-prompt").click(function() {
	// 	$(".checkin").hide()
	// 	$("#barcode-input").show()
	// 	$("#checkout-prompt").hide()
	// 	$("#team-input").show()

	// 	$("#in-button").show()
	// })
	
	// $("#checkout-team-input").submit(function () {
	// 	$(".checkout").hide()
	// 	$(".checkin").hide()
	// 	$("#checkout-scan").show()
	// })

	// When check-out or check-in button clicked, run this monstorous piece of logic
	$("form").submit(function() {
		// Grab some information from the form
		let teamNumber = $('input[name="team-number"]').val()
		//let buttonId = $(this).attr("id")

		// Check for part existance
		$.get("/api/parts/" + barcode)
			.then(part => {
				// Check if part stock is already 0
				if (part.stock === 0 && buttonId === "out-button") {
					errorHandler("Part has 0 stock!")
				}

				// Check for team existance
				$.get("/api/teams/" + teamNumber)
					.then(team => {
						// If checking in, check if the team has the part to check in
						if (buttonId === "in-button") {
							let idx = team.parts.indexOf(part.partName)
							if (idx === -1) {
								errorHandler("Team doesn't have this part to check in!")
							}
						}

						// Make edits to the part by incrementing/decrementing stock
						if (buttonId === "in-button") {
							part.stock += 1
						} else {
							part.stock -= 1
						}

						// Make edits to the team by adding/removing the part
						if (buttonId === "out-button") {
							// Add/remove part from team's parts
							team.parts.push(part.partName)
						} else {
							let idx = team.parts.indexOf(part.partName)
							team.parts.splice(idx, 1) // Removes part from team
						}

						// Use PUT endpoint to edit team
						$.ajax({ url: "/api/teams/" + teamNumber, type: "PUT", data: team })
							.then(() => {
								// Use PUT endpoint to edit part
								$.ajax({ url: "/api/parts/" + barcode, type: "PUT", data: part })
									.then(() => {
										successHandler()
									})
									.catch(err => {
										errorHandler(err)
									})
							})
							.catch(err => {
								errorHandler(err)
							})
					})
					.catch(() => {
						// Team doesn't exist

						// Checking in when team doesn't exist, that's a problem
						if (buttonId === "in-button") {
							errorHandler("Team doesn't have this part!")
						}

						// Make edits to the part by incrementing/decrementing stock
						if (buttonId === "in-button") {
							part.stock += 1
						} else {
							part.stock -= 1
						}

						// Create a new team
						let newTeam = {
							teamNumber,
							parts: [part.partName]
						}

						$.post("/api/teams", newTeam)
							.then(() => {
								$.ajax({ url: "/api/parts/" + barcode, type: "PUT", data: part })
									.then(() => {
										successHandler()
									})
									.catch(err => {
										errorHandler(err)
									})
							})
							.catch(err => {
								errorHandler(err)
							})
					})
			})
			.catch(err => {
				// Part does not exist
				errorHandler(err)
			})
	})
})

// Attempts to log the given error as well as exits the script
function errorHandler(err) {
	$(".input-form").html("")
	$(".input-form").html("<p>There was an error with your request: " + err + ". Redirecting...</p>")
	$(this).hide()

	setTimeout(location.reload.bind(location), 3000)

	// Exits script
	throw new Error(err)
}

// successHandler is the logic that runs when everything doesn't blow up
function successHandler() {
	$(".input-form").html("")
	$(".input-form").html("<p>Your request was successful! Redirecting...</p>")
	$(this).hide()

	setTimeout(location.reload.bind(location), 1000)
}
