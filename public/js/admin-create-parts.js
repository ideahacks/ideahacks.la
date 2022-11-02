$(() => {
	// When the parts creation form is submitted, hit the parts creation API
	$("#create-parts-form").submit((e) => {
		e.preventDefault()

		// Create a part from the data the user typed into the form
		let part = {
			partName: $('input[name="part-name"]').val(),
			barcode: $('input[name="part-barcode"]').val(),
			datasheet: $('input[name="part-datasheet"]').val(),
			type: $('select[name="part-type"]').val(),
			description: $('textarea[name="part-description"]').val(),
			stock: $('input[name="part-stock"]').val(),
			category: $('select[name="part-category"]').val(),
			imageUrl: $('input[name="part-image"]').val(),
			isConsumable: $('select[name="part-type"]').val() === "Consumable",
		}

		// Hit the POST /api/parts endpoint with the part
		$.post("/api/parts", part)
			.then((res) => {
				$("#error-message").text("Success! Reloading page in 2 seconds")
				setTimeout(() => location.reload(), 2000)
			})
			.catch((err) => {
				console.log(err)
				try {
					JSON.parse(err.responseText) // Check if there is a custom error message
					$("#error-message").text("Something went wrong. Make sure you have valid values for all fields")
				} catch (error) {
					$("#error-message").text(err.responseText)
				}
			})
	})

	$("input").click(() => $("#error-message").text(""))
})
