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
	// 	$("#barcode-scan").show()
	// })

	$("#checkout-team-input").submit(function() {
		$(".checkout-container").hide()
		$("#barcode-scan h1").text("You have decided to CHECK OUT a part")
		$(".barcode-form").attr("id", "out-button")
		$('.checkout input[type="text"]').attr("name", "team-number")
		$("#barcode-scan").show()
		$("#go-back").show()
		return false
	})

	$("#checkin-team-input").submit(function() {
		$(".checkout-container").hide()
		$("#barcode-scan h1").text("You have decided to CHECK IN a part")
		$(".barcode-form").attr("id", "in-button")
		$('.checkin input[type="text"]').attr("name", "team-number")
		$("#barcode-scan").show()
		$("#go-back").show()
		return false
	})

	$("#go-back-button").click(function() {
		$("#go-back").hide()
		$("#barcode-scan").hide()
		$("#checkin-scan").hide()
		$(".checkout-container").show()
	})

	$("#checkout-more-items").click(function() {
		$("#checkout-success").hide()
		$(".banner").show()
		$("#barcode-scan").show()
		$("#go-back").show()
	})

	$("#checkin-more-items").click(function() {
		$("#checkin-success").hide()
		$(".banner").show()
		$("#checkin-scan").show()
		$("#go-back").show()
	})

	// When check-out or check-in button clicked, run this monstorous piece of logic
	$(".barcode-form").submit(function() {
		// Grab some information from the form
		let barcode = $('input[name="barcode"]').val()
		let teamNumber = $('input[name="team-number"]').val()
		let buttonId = $(this).attr("id")
		let quantity = Number($('input[name="quantity"]').val())
		if (quantity <= 0) {
			errorHandler("Please input a positive number!")
		}

		for (var i = 0; i < quantity; i++) {
				// Check for part existence
			$.get("/api/parts/" + barcode)
			.then(part => {
				if (part.stock === 0 && buttonId === "out-button") {
					errorHandler("Part has 0 stock!")
				} else if (part.stock < quantity && buttonId === "out-button") {
					errorHandler("Quantity requested exceeds available parts!")
				}
				// Check for team existance
				$.get("/api/teams/" + teamNumber)
					.then(team => {
						var partCount = 0
						for (var i = 0; i < team.parts.length; i++) {
							if (team.parts[i] === part.partName) {
								partCount++;
							}
						}
						// if (part.stock < partCount) {
						// 	errorHandler("Team doesn't have that quantity of the part")
						// }
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
										alert("here1");
										errorHandler(err)
									})
							})
							.catch(err => {
								alert("here2");
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
										alert("here3");
										errorHandler(err)
									})
							})
							.catch(err => {
								alert("here4");
								errorHandler(err)
							})
					})
			})
			.catch(err => {
				// Part does not exist
				alert("here5");
				errorHandler(err)
			})
		}
		
	})
})

// Attempts to log the given error as well as exits the script
function errorHandler(err) {
	$("#barcode-scan").html("")
	$("#barcode-scan").html("<p>There was an error with your request: " + err + ". Redirecting...</p>")
	$(this).hide()

	setTimeout(location.reload.bind(location), 3000)

	// Exits script
	throw new Error(err)
}

// successHandler is the logic that runs when everything doesn't blow up
function successHandler() {
	$(".success").show()
	$(".banner").hide()
	$("#go-back").hide()
	$("#barcode-scan").hide()
	$(document).scrollTop(0)
	setTimeout(location.reload.bind(location), 3000)
}
