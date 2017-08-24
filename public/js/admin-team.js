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

    $.ajax({ url: '/admin/teams', type: 'POST', data: teamData }).done()
  })
})