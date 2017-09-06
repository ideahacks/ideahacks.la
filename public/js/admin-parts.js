$(document).ready(() => {
  $('form').submit(e => {
    e.preventDefault()

    let partsData = {
      partName: $('.part-name').val(),
      stock: $('.stock').val(),
      description: $('.description').val()
    }

    $.ajax({ url: '/admin/parts', type: 'POST', data: partsData }).done(results => {
    	if (results.status === 'failure') {
	$('.error-message').text(results.message)
	} 
	else {
	
		//appendPart
		appendNewPart(partData)


		//clear form
		$('input').val('')
	}
    
    
    })
  })
})

function appendNewPart(partData) {

		

		let newPartHTML = [
			'<li>',
			'<h1>', partData.partName, '</h1>',
			'<h1>', partData.stock, '</h1>',
			'</li>'
		]

		newPartHTML = newPartHTML.join('')

		$(newPartHTML).appendTo('.part-list')
	
}
