function CopyToClipboard(list) {
	//Credit to Prakash Poudel (https://www.sharmaprakash.com.np/javascript/copying-value-from-variable-to-clipboard/)

	var listString = list.split(",").join(";")

	$("<input>")
		.val(listString)
		.appendTo("body")
		.select()
	document.execCommand("copy")

	alert("Copied emails!")
}
