$(() => {
	$(".part-category").click(function () {
		const category = $(this).text()
		for (const part of $(".filter-list").children()) {
			if ($(part).attr("id") === category) {
				$(part).fadeIn(0)
			} else if (category === "ALL") {
				$(part).show()
			} else {
				$(part).fadeOut(0)
			}
		}
	})
})
