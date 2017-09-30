$(document).ready(() => {
  $('form').submit(e => {
    e.preventDefault()

    let partsData = {
      partName: $('.part-name').val(),
      stock: $('.stock').val(),
      description: $('.description').val(),
      type: $('input[name="ReturnOrConsume"]:checked').val(),
      manufacturer: $('.manufacturer').val(),
      manufacturerPartNumber: $('.partNumber').val(),
      datasheet: $('.partNumber').val()
    }

    $.ajax({ url: '/admin/parts', type: 'POST', data: partsData }).done(results => {
      if (results.status === 'failure') {
        $('.error-message').text(results.message)
      } else {
        appendNewPart(partsData)

        $('input[type="text"]').val('')
        $('input[type="number"]').val('')
        $('input').attr('checked', '')
      }
    })
  })

  $('input').focus(() => $('.error-message').text(''))
})

function appendNewPart(partData) {
  let newPartHTML = [
    '<li>',
    '<h1>',
    partData.partName,
    '</h1>',
    '<p>',
    partData.stock,
    '</p>',
    '<p>',
    partData.type,
    '</p>',
    '<p>',
    partData.manufacturer,
    '</p>',
    '<p>',
    partData.manufacturerPartNumber,
    '</p>',
    '<p>',
    partData.datasheet,
    '</p>',
    '</li>'
  ]

  newPartHTML = newPartHTML.join('')

  $(newPartHTML).appendTo('.part-list')
}
