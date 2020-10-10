// $(() => {
// 	$(".email-list-name").click(function() {
// 		$(this)
// 			.next()
// 			.slideToggle(150)

// 		let arrow = $(this).children(".glyphicon")
// 		if (arrow.hasClass("rotate")) {
// 			arrow.removeClass("rotate")
// 			arrow.css("transform", "rotate(0deg)")
// 		} else {
// 			arrow.addClass("rotate")
// 			arrow.css("transform", "rotate(180deg)")
// 		}
// 	})
// })

//Backup
function CopyToClipboard(list) {
	var copyText = document.getElementById("empty")
	var listString = list.split(",").join(";")

	copyText.innerHTML = listString

	/* Select the text field */
	copyText.select()
	// copyText.setSelectionRange(0, 99999); /*For mobile devices*/

	/* Copy the text inside the text field */
	document.execCommand("copy")

	/* Alert the copied text */
	alert("Copied the text: " + copyText.value)
}
