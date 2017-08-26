$(document).ready(() => {
  $('form').submit(e => {
    e.preventDefault()

    let partsData = {
      partName: $('.part-name').val(),
      stock: $('.stock').val(),
      description: $('.description').val()
    }

    $.ajax({ url: '/admin/parts', type: 'POST', data: partsData }).done()
  })
})
