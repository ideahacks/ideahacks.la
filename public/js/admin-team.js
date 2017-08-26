$(document).ready(() => {
  $('form').submit(e => {
    e.preventDefault()

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
      if (response.status === 'failure') {
        $('.error-message').text(response.message)
      } else {
        const newTeamHTML = [
          '<li>',
            '<h1>',teamData.teamName,'</h1>',
            '<h1>',teamData.teamNumber,'</h1>',
          '</li>'
        ].join('')

        $(newTeamHTML).prependTo('.team-list')
        $('input').val('')
      }
    })
  })

  $('input').focus(() => $('.error-message').text(''))
})
