$(document).ready(() => {
  let socket = io('/admin/teams') // open socket to the server

  // deleting team from the page
  $('.team-list').on('click', 'li span.delete-team', deleteTeam)

  // form submission logic
  $('form').submit(e => {
    e.preventDefault()
    userNoLongerTyping()

    let teamMembers = []
    $('.member-email').each((i, el) => {
      if (el.value !== '') teamMembers.push(el.value)
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
        appendNewTeam(teamData)
        socket.emit('team created', teamData)
        $('input').val('')
      }
    })
  })

  // clear error message when user tries to retry
  $('input').focus(() => $('.error-message').text(''))

  // user is typing logic
  let typing = false
  let timeout
  let userNoLongerTyping = () => {
    typing = false
    socket.emit('no longer typing')
  }
  $('input').on('input', () => {
    if (typing === false) {
      typing = true
      socket.emit('user typing')
      timeout = setTimeout(userNoLongerTyping, 5000)
    } else {
      clearTimeout(timeout)
      timeout = setTimeout(userNoLongerTyping, 5000)
    }
  })
  socket.on('user typing', () => $('.user-typing-message').text('A team is being created.'))
  socket.on('no longer typing', () => $('.user-typing-message').text(''))

  // append new team to list when server sends team created event
  socket.on('team created', teamData => appendNewTeam(teamData))
})

function appendNewTeam(teamData) {
  // prettier-ignore
  let newTeamHTML = [
    '<li>',
      '<span class="delete-team">&times;</span>',
      '<h1 class="team-name">',teamData.teamName,'</h1>',
      '<h1>',teamData.teamNumber,'</h1>',
  ]
  for (let email of teamData.members) {
    newTeamHTML.push('<p>', email, '</p>')
  }
  newTeamHTML.push('</li>')
  newTeamHTML = newTeamHTML.join('')

  $(newTeamHTML).prependTo('.team-list')
}

function deleteTeam() {
  if (confirm('Are you sure you want to delete this team?')) {
    let teamName = $(this)
      .parent()
      .find('.team-name')
      .text()

    $.ajax({ url: '/admin/teams/delete/' + teamName, type: 'DELETE' }).done(response => {
      if (response.status === 'failure') {
        $('.error-message').text(response.message)
      } else if (response.status === 'success') {
        $(this)
          .parent()
          .remove()
      }
    })
  }
}
