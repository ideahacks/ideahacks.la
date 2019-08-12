$(() => {
	//Team number is inputted for check out
	$("#checkout-team-input").submit(function() {
		$(".checkout-container").hide()
		$("#barcode-scan h1").text("You have decided to CHECK OUT a part")
		$(".barcode-form").attr("id", "out-button")
		$('.checkout input[type="text"]').attr("name", "team-number")
		$("#barcode-scan").show()
		$("#go-back").show()
		return false
	})

	//Team number is inputted for check in 
	$("#checkin-team-input").submit(function() {
		$(".checkout-container").hide()
		$("#barcode-scan h1").text("You have decided to CHECK IN a part")
		$(".barcode-form").attr("id", "in-button")
		$('.checkin input[type="text"]').attr("name", "team-number")
		$("#barcode-scan").show()
		$("#go-back").show()
		return false
	})

	//Return back to original page with check out and check in options
	$("#go-back-button").click(function() {
		$("#go-back").hide()
		$("#barcode-scan").hide()
		$('#barcode-scan input[type="text"]').val("")
		$("#checkin-scan").hide()
		$('.checkout input[type="text"]').val("")
		$('.checkin input[type="text"]').val("")
		$(".checkout-container").show()
	})

	$("#checkout-more-items").click(function() {
		$("#checkout-success").hide()
		$(".banner").show()
		$("#barcode-scan").show()
		$("#go-back").show()
	})

	// When check-out or check-in button clicked, run this monstorous piece of logic
	$(".barcode-form").submit(function() {
		// Grab some information from the form
		let barcode = $('input[name="barcode"]').val()
		let teamNumber = $('input[name="team-number"]').val()
		alert(teamNumber)
		let buttonId = $(this).attr("id")
		let quantity = Number($('input[name="quantity"]').val())
		if (quantity <= 0) {
			errorHandler("Please input a positive number!")
		}
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
						let idx = team.parts.map(function(p){return p.name}).indexOf(part.partName)
						//If checking in, check if the team has the part to check in
						if (buttonId === "in-button") {
							//let idx = team.parts.indexOf(part.partName)
							if (idx === -1) {
								errorHandler("Team doesn't have this part to check in!")
							} else if (team.parts[idx].quantity < quantity) {
								errorHandler("Team does not have that quantity of parts!")
							}
						}

						// Make edits to the part by incrementing/decrementing stock
						if (buttonId === "in-button") {
							part.stock += quantity
						} else {
							part.stock -= quantity
						}

						// Make edits to the team by adding/removing the part
						if (buttonId === "out-button") {
							// Add/remove part from team's parts
							//team.parts.push(part.partName)
							//let idx = team.parts.map(function(p){return p.name}).indexOf(part.partName)
							// Creates a new part object if the part doesn't exist, increments quantity otherwise
							if (idx === -1) {
								team.parts.push({
									name: part.partName,
									quantity: quantity
								})
							} else {
								team.parts[idx].quantity += quantity
							}
						} else {
							
							//let idx = team.parts.indexOf(part.partName)
							//let idx = team.parts.map(function(p){return p.name}).indexOf(part.partName)
							
							if (team.parts[idx].quantity - quantity === 0) {
								team.parts.splice(idx, 1)
							} else {
								team.parts[idx].quantity -= quantity
							}
							//team.parts.splice(idx, 1) // Removes part from team
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
						debugger
						// Checking in when team doesn't exist, that's a problem
						if (buttonId === "in-button") {
							errorHandler("Team doesn't exist or quantity exceeds what the team has!")
						}

						// Make edits to the part by incrementing/decrementing stock
						if (buttonId === "in-button") {
							part.stock += quantity
						} else {
							part.stock -= quantity
						}

						// Create a new team
						let newTeam = {
							teamNumber,
							parts: [{
								name: part.partName,
								quantity: quantity
							}] 
							//[part.partName]
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
	$('#barcode-scan input[type="text"]').val("")
	$(document).scrollTop(0)
	setTimeout(location.reload.bind(location), 3000)
}
