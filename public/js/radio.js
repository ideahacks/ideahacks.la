$(() => {
	$(".radio-outer-square").click(function() {
		$(".radio-outer-square").removeClass("active")
		$(this).addClass("active")

		let chosen = $(this)
			.next()
			.html()
			.toLowerCase()
			.split(" ")
			.join("-")

		$('input[type="radio"]').removeAttr("checked")
		$('input[type="radio"][value="' + chosen + '"]').click()
		$('input[type="radio"][value="' + chosen + '"]').attr("checked", "checked")
	})
})
