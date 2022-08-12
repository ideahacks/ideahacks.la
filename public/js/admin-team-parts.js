$(() => {
	$(".team-dropdown").click(function () {
		$(this).find(".team-dropdown-content").toggle()
		$(this).find(".downarrow").toggleClass("flipped")
	})
})
