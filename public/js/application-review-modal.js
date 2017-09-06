$(() => {
  let modal = document.getElementById('myModal')

  $('li').click(function() {
    let userEmail = $(this)
      .attr('class')
      .split(' ')[0]
    let userApiUrl = '/api/users/' + userEmail

    $.ajax({ url: userApiUrl, type: 'GET' }).done(response => {
      for (let key in response) {
        $('*[name="' + key + '"]').text(response[key])
      }
      $('input[value="' + response['applicationStatus'] + '"]').attr('checked', 'checked')
      modal.style.display = 'block'
    })
  })

  $('input[name="application-status-radio"]').click(function() {
    let userEmail = $('span[name="email"]').text()
    let oldApplicationStatus = $('span[name="applicationStatus"]').text()
    let newApplicationStatus = $(this).val()
    let userApiUrl = '/api/users/change/application-status/' + userEmail + '/' + newApplicationStatus

    $.ajax({ url: userApiUrl, type: 'POST' }).done(response => {
      if (response.status === 'failure') console.log(response.message)

      changeApplicationStatus(userEmail, oldApplicationStatus, newApplicationStatus)
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

function changeApplicationStatus(userEmail, oldApplicationStatus, newApplicationStatus) {
  let application = $('li[name="' + userEmail + '"]')
  application.removeClass(oldApplicationStatus)
  application.addClass(newApplicationStatus)

  application.find('.application-status').text(newApplicationStatus)
}
