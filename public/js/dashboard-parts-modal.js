$(() => {
  let modal = document.getElementById('partsModal')

  // display modal when clicking on part
  $('.part').click(function() {
    let partName = $(this)
      .find('.part-name')
      .text()
    let partsApiURL = '/api/parts/name/' + partName

    $.ajax({ url: partsApiURL, type: 'GET' }).done(partInfo => {
      for (let data in partInfo) {
        $('span[name="' + data + '"]').text(partInfo[data])
      }
      $('a[name="datasheet-link"]').attr('href', partInfo.datasheet)

      modal.style.display = 'block'
    })
  })

  // closes modal when clicking outside
  window.onclick = e => {
    if (e.target === modal) {
      modal.style.display = 'none'
    }
  }
})
