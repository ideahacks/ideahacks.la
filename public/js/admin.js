$(() => {
	$(".email-list-name").click(function() {
		$(this)
			.next()
			.slideToggle(150)

		let arrow = $(this).children(".glyphicon")
		if (arrow.hasClass("rotate")) {
			arrow.removeClass("rotate")
			arrow.css("transform", "rotate(0deg)")
		} else {
			arrow.addClass("rotate")
			arrow.css("transform", "rotate(180deg)")
		}
	})
})
