$(() => {
	let modal = document.getElementById("partsModal")

	// display modal when clicking on part
	$(".part").click(function() {
		const PARTS_API_URL = "/api/parts?_id=" + $(this).attr("id")

		$.ajax({ url: PARTS_API_URL, type: "GET" }).done(part => {
			let partData = part[0] // Retrieve only the first part
			for (let data in partData) {
				$('span[name="' + data + '"]').text(partData[data])
			}
			$('a[name="datasheet"]').text(partData.datasheet)
			$('a[name="datasheet"]').attr("href", partData.datasheet)
			$('img[name="partimg"]').attr("src", partData.imageUrl)

			modal.style.display = "block"
		})
	})

	// closes modal when clicking outside
	window.onclick = e => {
		if (e.target === modal) {
			modal.style.display = "none"
		}
	}
})
