$(() => {
	// When checkout is selected, display next step
	$("#checkout-prompt").click(function() {
		$(".checkin").hide()
		$("#barcode-input").show()
		$(this).hide()
		$("#team-input").show()

		$("#out-button").show()
	})

	// When checkin is selected, display next step
	$("#checkin-prompt").click(function() {
		$(".checkin").hide()
		$("#barcode-input").show()
		$("#checkout-prompt").hide()
		$("#team-input").show()

		$("#in-button").show()
	})

	$("button").click(function() {
		$(".input-form").html("")
		$(".input-form").html("<p>Your request was successful! Redirecting...</p>")
		$(this).hide()

		setTimeout(location.reload.bind(location), 2000)
	})
})
