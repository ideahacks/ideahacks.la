$(() => {
	let modal = document.getElementById("part-creation-modal")

	// when application clicked on, inject info into modal, and then display modal
	$('button[title="Add Part"]').click(function() {
		modal.style.display = "block"

		// when user clicks outside the modal, hide the modal
		window.onclick = e => {
			if (e.target === modal) {
				modal.style.display = "none"
			}
		}
	})
})
