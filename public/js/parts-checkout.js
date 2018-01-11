$(() => {
  let checkoutSocket = io('/admin/parts') // open socket to the server

  let modal = document.getElementById('part-checkout-modal')

  // when application clicked on, inject info into modal, and then display modal
  $('.parts-list').on('click', 'li.part', function() {
    let partName = $(this)
      .find('.part-name')
      .text()
    let currentStock = $(this)
      .find('.part-stock')
      .text()
      .split(' in Stock')[0]

    $('span[name="partName"]').text(partName)
    $('span[name="current-stock"]').text(currentStock)
    $('.parts-checkout-form').attr('id', $(this).attr('id'))
    $('span[name="part-owners"]').text('')
    modal.style.display = 'block'

    // When modal is launched, set the window's onclick handler
    // to close the modal
    window.onclick = e => {
      if (e.target === modal) {
        resetFormFields()
        modal.style.display = 'none'
      }
    }

    let ownerApiUrl = '/api/parts/owners/' + $(this).attr('id')
    $.ajax({ url: ownerApiUrl, type: 'GET' }).done(res => {
      if (res.status === 'success') {
        $('span[name="part-owners"]').text(res.owners.join(', '))
      }
    })
  })

  // parts checkout form logic
  $('.parts-checkout-form').submit(function(e) {
    e.preventDefault()

    let partId = $(this).attr('id')
    let action = $('input[name="part-checkout-radio"][checked]').val()
    let quantity = $('input[name="quantity"]').val()
    let teamNumber = $('input[name="teamNumber"]').val()
    let apiUrl =
      '/api/parts/action/' + action + '/part/' + partId + '/quantity/' + quantity + '/teamNumber/' + teamNumber

    $.ajax({ url: apiUrl, type: 'POST' }).done(res => {
      if (res.status === 'failure') {
        $('.parts-checkout-error-message').text(res.message)
      } else {
        // asynchronously change part stock on pages
        changePartStock(partId, res.newStock)

        // Broadcast to other clients that a change has been made
        checkoutSocket.emit('part transformation', { id: partId, stock: res.newStock })

        // clear out form fields and hide modal
        resetFormFields()
        modal.style.display = 'none'
      }
    })
  })

  // Listen for "part transformation" from socket and make adjustments to page
  checkoutSocket.on('part transformation', transformation => {
    changePartStock(transformation.id, transformation.stock)
  })
})

function changePartStock(partId, newStock) {
  // finds the part on the page and updates it stock to the newStock
  $('.part#' + partId)
    .find('.part-stock')
    .text(newStock + ' in Stock')
}

function resetFormFields() {
  // resets the parts checkout form so that it's blank every time a user opens it
  $('input[name="teamNumber"]').val('')
  $('input[name="quantity"]').val('1')
  $('.radio-outer-square').removeClass('active')
  $('.parts-checkout-error-message').text('')
}
