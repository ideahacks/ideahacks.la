$(() => {
	$('input[name="email"]').focus()

	$("form").submit(e => {
		e.preventDefault()

		//make email case insensitive
		let email_nocase = $('input[name="email"]').val().toLowerCase()

		let registrationData = {
			email: email_nocase,
			password: $('input[name="password"]').val(),
			passwordConfirm: $('input[name="password-confirm"]').val()
		}

		$.ajax({ url: "/registration", type: "POST", data: registrationData }).done(response => {
			if (response.status === "success") location.href = "/login" // redirect

			$('input[type="Password"]').val("")
			$(".error-message").html(response.message)
		})
	})

	$("input").focus(() => $(".error-message").html(""))
})
