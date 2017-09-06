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
      } else {
        appendNewPart(partsData)

        $('input').val('')
      }
    })
  })

  $('input').focus(() => $('.error-message').text(''))
})

function appendNewPart(partData) {
  // prettier-ignore
  let newPartHTML = [
    '<li>',
      '<h1>', partData.partName, '</h1>',
      '<h1>', partData.stock, '</h1>',
    '</li>'
  ]

  newPartHTML = newPartHTML.join('')

  $(newPartHTML).appendTo('.part-list')
}
