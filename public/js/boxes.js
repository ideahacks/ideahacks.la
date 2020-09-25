$(() => {
	// Show modal on clicking a part
	$(".part").click(function() {
		// Get part info
		const part = $(this)
		const name = part.children(".part-name").html()
		const image = part.children("img").attr("src")
		const color = part.children("img").css("border-color")
		const quantity = part
			.children(".quantity")
			.html()
			.split(" ")[1] // Requires quantity text to be inline in HTML
		const category = part.attr("data-category")
		const description = part.attr("data-description")
		const datasheet = part.attr("data-datasheet")

		// Load info into modal
		$("#part-modal .name").html(name)
		$("#part-modal img").attr({ src: image, alt: name })
		$("#part-modal img").css("border-color", color)
		$("#part-modal .quantity .content").html(quantity)
		$("#part-modal .category .content").html(category)
		$("#part-modal .description .content").html(description)
		$("#part-modal .datasheet a").attr("href", datasheet)
		$("#part-modal .datasheet a").html(datasheet)

		// Display modal
		$("#part-modal").fadeIn("fast")
		return false
	})

	// Hide modal on clicking background
	$("#part-modal").click(function(e) {
		if (!e.target.closest(".modal-content")) {
			$("#part-modal").fadeOut("fast")
		}
	})
})
