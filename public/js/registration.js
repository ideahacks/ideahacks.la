$(document).ready(() => {
  $('form').submit(e => {
    e.preventDefault()

    let registrationData = {
      email: $('input[name="email"]').val(),
      password: $('input[name="password"]').val(),
      passwordConfirm: $('input[name="password-confirm"]').val()
    }

    $.ajax({ url: '/registration', type: 'POST', data: registrationData }).done(response => {
      if (response.status === 'success') location.href = '/' // redirects to main page

      $('input').val('') // empties all input fields
      // TODO: inject error message when failure
    })
  })
})