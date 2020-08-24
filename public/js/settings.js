$(() => {
	$("#save").click(e => {
		e.preventDefault()

		let newInfo = {}
		// If email has changed
		if (
			$('[name="email"]')
				.val()
				.toLowerCase() !==
			$('[name="email"]')
				.attr("data-email")
				.toLowerCase()
		) {
			newInfo.email = $('[name="email"]')
				.val()
				.toLowerCase()
		}

		// If there is a new password
		if ($('[name="password"]').val()) {
			newInfo.newPassword = $('[name="password"]').val()
		}

		// Only send POST if there are any changes
		if (!$.isEmptyObject(newInfo)) {
			$.ajax({
				url: "/dashboard/me/settings",
				type: "POST",
				data: newInfo
			}).done(res => {
				if (res.status === "success") {
					$(".error-message").text("Changes saved!")
					setTimeout(() => (location.href = "/dashboard/me"), 1000)
				} else {
					$(".error-message").text(res.message)
				}
			})
		} else {
			$(".error-message").text("No changes to save")
		}
	})

	$("input").focus(() => $(".error-message").text(""))
})
