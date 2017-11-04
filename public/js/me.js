$(() => {
  $('form[name="feedback-form"]').submit(e => {
    e.preventDefault()

    const formData = {
      content: $('textarea[name="content"]').val()
    }

    $.ajax({ url: '/feedback', type: 'POST', data: formData }).done(res => {
      if (res.status === 'success') {
        $('textarea[name="content"]').val('')
        $('.response-message').text(res.message)
      }
    })
  })

  $('textarea[name="content"]').focus(() => {
    $('.response-message').text('')
  })
})
