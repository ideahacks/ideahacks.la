$(() => {
	// When the parts creation form is submitted, hit the parts creation API
	$(".create-parts-form").submit(e => {
		e.preventDefault()

		// Create a part from the data the user typed into the form
		let part = {
			partName: $('input[name="part-name"]').val(),
			barcode: $('input[name="part-barcode"]').val(),
			description: $('textarea[name="part-description"]').val()
		}

		// Hit the POST /api/parts endpoint with the part
		$.post("/api/parts", part)
			.then(res => {
				// On successful creation, just refresh for now
				location.reload()
			})
			.catch(err => {
				// On error, just log for now
				console.log(err)
			})
	})
})
