$(() => {
	$(".resend-verification").click(() => {
		$.ajax({ url: "/confirm", type: "POST" }).done((response) => {
			$(".response").text(response.message)
		})
	})
})
