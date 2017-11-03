$(document).ready(() => {
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
  // prettier-ignore
  let newPartHTML = [
    '<li class="row part">',
      '<p class="filter-key col-sm-4 col-xs-6 part-name">', partData.partName, '</p>',
      '<p class="filter-key col-sm-4 col-xs-6 text-center part-stock">', partData.stock, ' in Stock</p>',
      '<p class="filter-key col-sm-4 text-right part-type">', partData.type, '</p>',
    '</li>'
  ]

  newPartHTML = newPartHTML.join('')

  $(newPartHTML).appendTo('.parts-list')
}
