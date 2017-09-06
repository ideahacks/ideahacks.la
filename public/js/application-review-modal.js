$(() => {
  let modal = document.getElementById('myModal')

  $('li').click(function() {
    let userApiUrl = '/api/users/' + $(this).attr('class')

    $.ajax({ url: userApiUrl, type: 'GET' }).done(response => {
      for (let key in response) {
        $('*[name="' + key + '"]').text(response[key])
      }
      modal.style.display = 'block'
    })
  })

  $('span').click(() => {
    modal.style.display = 'none'
  })

  window.onclick = e => {
    if (e.target === modal) {
      modal.style.display = 'none'
    }
  }
})
