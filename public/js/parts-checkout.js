$(() => {
	// When checkout is selected, display next step
	$("#checkout-prompt").click(function() {
		$("#barcode-input").show()
		$(this).hide()
		$("#team-input").show()
		$("#checkin-prompt").hide()

		$("#out-button").show()
	})

	// When checkin is selected, display next step
	$("#{checkin-prompt}").click(function() {
		$("#barcode-input").show()
		$("#checkout-prompt").hide()
		$("#team-input").show()
		$(this).hide()

		$("#in-button").show()
	})

	$
})
