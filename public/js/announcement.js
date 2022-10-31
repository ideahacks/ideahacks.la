// Conditional rendering for the announcement
$(document).ready(function () {
	const ANNOUNCEMENT_VISIBILITY = "announcement-visibility"

	// Display announcement on first visit
	if (sessionStorage.getItem(ANNOUNCEMENT_VISIBILITY) === null) {
		sessionStorage.setItem(ANNOUNCEMENT_VISIBILITY, "true")
	}

	if (sessionStorage.getItem(ANNOUNCEMENT_VISIBILITY) === "true") {
		$("#announcement").show()
	} else {
		$("#announcement").hide()
	}

	$("#close").click(function () {
		$(this).parent().hide()
		sessionStorage.setItem(ANNOUNCEMENT_VISIBILITY, "false")
	})
})
