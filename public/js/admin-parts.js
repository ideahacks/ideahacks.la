$(document).ready(() => {
	$("form").submit(e => {
		e.preventDefault()
		console.log("hello world")

		let partsData = {
			partName: $('part-name').val(),
			stock: $('stock').val(),
			description: $('description').val()
		}


		$.ajax({ url: '/admin/parts', type: 'POST', data: partsData }).done()

	})
});

	
