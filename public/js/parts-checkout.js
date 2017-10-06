$(() => {
  let modal = document.getElementById('myModal')

  // when application clicked on, inject info into modal, and then display modal
  $('.part').click(function() {
    let partName = $(this)
      .find('.part-name')
      .text()
    let currentStock = $(this)
      .find('.part-stock')
      .text()
      .split(' in Stock')[0]

    $('span[name="partName"]').text(partName)
    $('span[name="current-stock"]').text(currentStock)
    modal.style.display = 'block'
  })

  // parts checkout form logic
  $('.parts-checkout-form').submit(e => {
    e.preventDefault()

    let partName = $('span[name="partName"]').text()
    let action = $('input[name="part-checkout-radio"][checked]').val()
    let quantity = $('input[name="quantity"]').val()
    let teamNumber = $('input[name="teamNumber"]').val()
    let apiUrl =
      '/api/parts/action/' + action + '/partName/' + partName + '/quantity/' + quantity + '/teamNumber/' + teamNumber

    $.ajax({ url: apiUrl, type: 'POST' }).done(res => {
      if (res.status === 'failure') {
        $('.parts-checkout-error-message').text(res.message)
      } else {
        // asynchronously change part stock on pages
        changePartStock(partName, res.newStock)

        // clear out form fields and hide modal
        resetFormFields()
        modal.style.display = 'none'
      }
    })
  })

  // when user clicks outside the modal, hide the modal
  window.onclick = e => {
    if (e.target === modal) {
      resetFormFields()
      modal.style.display = 'none'
    }
  }
})

function changePartStock(partName, newStock) {
  // finds the part on the page and updates it stock to the newStock
  $('.part').each((i, el) => {
    let elementName = $(el)
      .find('.part-name')
      .text()
    if (elementName === partName) {
      $(el)
        .find('.part-stock')
        .text(newStock + ' in Stock')
    }
  })
}

function resetFormFields() {
  // resets the parts checkout form so that it's blank every time a user opens it
  $('input[name="teamNumber"]').val('')
  $('input[name="quantity"]').val('1')
  $('.radio-outer-square').removeClass('active')
  $('.parts-checkout-error-message').text('')
}
