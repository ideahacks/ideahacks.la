$(() => {
  let modal = document.getElementById('myModal')

  // when application clicked on, make API call, inject info into modal, and then display modal
  $('li').click(function() {
    let userEmail = $(this)
      .attr('class')
      .split(' ')[0]
    let userApiUrl = '/api/users/' + userEmail

    $.ajax({ url: userApiUrl, type: 'GET' }).done(response => {
      for (let key in response) {
        $('*[name="' + key + '"]').text(response[key])
      }
      $('a[name="github-anchor"]').attr('href', response.github)
      $('a[name="linkedin-anchor"]').attr('href', response.linkedin)
      $('input[value="' + response['applicationStatus'] + '"]').attr('checked', 'checked')
      $('.radio-outer-square').each(function(i, el) {
        let labelText = $(el)
          .next()
          .html()
          .toLowerCase()
        if (labelText === response.applicationStatus) {
          $(el).click()
        }
      })
      modal.style.display = 'block'
    })
  })

  // when radio button is clicked, asynchronously change application status
  $('input[name="application-status-radio"]').click(function() {
    let userEmail = $('span[name="email"]').text()
    let oldApplicationStatus = $('li[name="' + userEmail + '"]')
      .find('.application-status')
      .text()
    let newApplicationStatus = $(this).val()
    let userApiUrl = '/api/users/change/application-status/' + userEmail + '/' + newApplicationStatus

    $.ajax({ url: userApiUrl, type: 'POST' }).done(response => {
      if (response.status === 'failure') console.log(response.message)

      changeApplicationStatus(userEmail, oldApplicationStatus, newApplicationStatus)
    })
  })

  // when user clicks outside the modal, hide the modal
  window.onclick = e => {
    if (e.target === modal) {
      modal.style.display = 'none'
    }
  }
})

// logic that's fired when an application status changes
function changeApplicationStatus(userEmail, oldApplicationStatus, newApplicationStatus) {
  // change class
  let application = $('li[name="' + userEmail + '"]')
  application.removeClass(oldApplicationStatus)
  application.addClass(newApplicationStatus)

  // change status text
  application.find('.application-status').text(newApplicationStatus)

  // adjust status boxes
  if (oldApplicationStatus !== newApplicationStatus) {
    let oldApplicationStatusNumber = $('h1.number-' + oldApplicationStatus).text()
    let newApplicationStatusNumber = $('h1.number-' + newApplicationStatus).text()
    $('h1.number-' + oldApplicationStatus).text(parseInt(oldApplicationStatusNumber) - 1)
    $('h1.number-' + newApplicationStatus).text(parseInt(newApplicationStatusNumber) + 1)
  }
}
