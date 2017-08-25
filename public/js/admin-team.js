$(document).ready(() => {
  $('form').submit(e => {
    e.preventDefault()
    $('.error-message').html('')

    let teamMembers = []
    $('.member-email').each(function(i, el) {
      teamMembers.push(el.value)
    })

    let teamData = {
      teamName: $('.team-name').val(),
      teamNumber: $('.team-number').val(),
      members: teamMembers,
      parts: []
    }

    $.ajax({ url: '/admin/teams', type: 'POST', data: teamData }).done(response => {
        if(response.status === 'failure') $('.error-message').html(response.message)
    })
  })
})