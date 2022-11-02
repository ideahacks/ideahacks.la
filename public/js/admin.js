function CopyToClipboard(list) {
	var listString = list.split(",").join(";")

	var $temp = $("<input>").val(listString).appendTo("body").select()
	document.execCommand("copy")
	$temp.remove()

	alert("Copied emails!")
}
