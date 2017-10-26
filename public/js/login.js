$(() => {
  $('input[name="username"]').focus()

  $('form').submit(e => {
    e.preventDefault()

    let loginData = {
      username: $('input[name="username"]').val(),
      password: $('input[name="password"]').val()
    }

    $.ajax({ url: '/login', type: 'POST', data: loginData }).done(response => {
      if (response.status === 'success') location.href = '/dashboard'

      $('.error-message').text(response.message)
    })
  })

  $('input').focus(() => $('.error-message').text(''))
})
