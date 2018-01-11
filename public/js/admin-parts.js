$(document).ready(() => {
  let socket = io('/admin/parts') // open socket to the server

  // Part creation logic
  $('.part-creation-form').submit(e => {
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
        appendNewPart(partsData, results.id)

        // Broadcast to all other clients that a part has been created
        socket.emit('part created', { part: partsData, id: results.id }) // Tell everyone else part was created

        $('input[type="text"]').val('')
        $('input[type="number"]').val('')
        $('input').attr('checked', '')
      }
    })
  })

  $('input').focus(() => $('.error-message').text(''))

  // Listen for "part created" on socket, and add part when neeeded
  socket.on('part created', data => {
    appendNewPart(data.part, data.id)
  })
})

function appendNewPart(partData, id) {
  // prettier-ignore
  let newPartHTML = [
    '<li class="row part" id="' + id + '">',
      '<p class="filter-key col-sm-4 col-xs-6 part-name">', partData.partName, '</p>',
      '<p class="filter-key col-sm-4 col-xs-6 text-center part-stock">', partData.stock, ' in Stock</p>',
      '<p class="filter-key col-sm-4 text-right part-type">', partData.type, '</p>',
    '</li>'
  ]

  newPartHTML = newPartHTML.join('')

  $(newPartHTML).appendTo('.parts-list')
}
