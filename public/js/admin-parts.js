$(() => {
	$(".part-category").click(function() {
		let category = $(this).text()
		console.log(category)
		for (let part of $(".filter-list").children()) {
			if ($(part).attr("id") == category) {
				$(part).fadeIn(0)
			} else if (category == "ALL") {
				$(part).show()
			} else {
				$(part).fadeOut(0)
			}
		}
	})
})
