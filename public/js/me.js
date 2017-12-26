$(() => {
  // Feedback form submission logic
  $('form[name="feedback-form"]').submit(e => {
    e.preventDefault()

    const formData = {
      content: $('textarea[name="content"]').val()
    }

    $.ajax({ url: '/api/feedback', type: 'POST', data: formData }).done(res => {
      if (res.status === 'success') {
        $('textarea[name="content"]').val('')
        $('.response-message').text(res.message)
      }
    })
  })

  $('textarea[name="content"]').focus(() => {
    $('.response-message').text('')
  })

  // Change profile information form logic
  $('form.profile-form').submit(e => {
    e.preventDefault()

    const profileFormData = {
      firstName: $('input[name="firstName"]').val(),
      lastName: $('input[name="lastName"]').val(),
      newPassword: $('input[name="password"]').val()
    }

    $.ajax({ url: '/dashboard/me', type: 'POST', data: profileFormData }).done(res => {
      $('input[name="password"]').val('')
      $('.profile-form-message').text(res.message)
    })
  })

  $('.profile-form input').focus(() => {
    $('.profile-form-message').text('')
  })

  // Check out button logic
  $('.check-out-button').click(() => {
    const checkoutConfirmMessage = [
      'Are you sure ou want to permanently check out of IDEA Hacks?',
      'You will still be able to login after you check out.'
    ]

    if (confirm(checkoutConfirmMessage.join('\n'))) {
      $.ajax({ url: '/api/currentuser/checkout', type: 'POST' }).done(res => {
        location.href = '/logout'
      })
    }
  })
})
