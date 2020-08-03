$(() => {
	$('input[name="username"]').focus()

	// handle login form submission
	$("form").submit(e => {
		e.preventDefault()

		//make username case insensitive
		let username_nocase = $('input[name="username"]')
			.val()
			.toLowerCase()

		let loginData = {
			username: username_nocase,
			password: $('input[name="password"]').val()
		}

		$.ajax({ url: "/login", type: "POST", data: loginData }).done(response => {
			if (response.status === "success") location.href = "/dashboard"

			$(".error-message").text(response.message)
		})
	})

	$("input").focus(() => $(".error-message").text(""))

	// password recovery logic
	$('a[name="password-recover"]').click(() => {
		const email = $('input[name="username"]').val()
		if (email) {
			$.ajax({ url: "/login/recoverPassword/" + email, type: "POST" }).done(response => {
				$(".error-message").text(response.message)
			})
		} else {
			$(".error-message").text("Please enter your email into the email field to recover your password!")
		}
	})

	// google button animation
	$('#google').on("mousedown touchstart", function() {
		this.src = "/img/login/google-pressed.png"
	})

	$('#google').on("mouseup touchend", function() {
		this.src = "/img/login/google.png"
	})
})
