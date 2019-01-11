function filter() {
	/**
	 * Filter Logic
	 * Requires a <ul> element with the class "filter-list"
	 * Filters <li> elements based on child elements having the class "filter-key"
	 */

	let searchBarValue = $("input.filter").val()
	for (let part of $("ul.filter-list").children()) {
		let keyValue = ""
		$(part)
			.find(".filter-key")
			.each((i, el) => {
				keyValue += $(el).text()
			})
		keyValue = keyValue.toUpperCase()
		if (keyValue.indexOf(searchBarValue.toUpperCase()) > -1) {
			$(part).fadeIn(300)
		} else {
			$(part).fadeOut(300)
		}
	}
}
