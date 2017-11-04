$(() => {
  $('.announcement-form').submit(e => {
    e.preventDefault()

    let announcementData = {
      header: $('input[name="announcement-header"]').val(),
      body: $('textarea[name="announcement-body"]').val(),
      category: 'general'
    }

    $.ajax({ url: '/admin/announcements', type: 'POST', data: announcementData }).done(response => {
      appendNewAnnouncement(announcementData)
      $('input, textarea').val('')
    })
  })

  //deleting annoucement
  $('.x-icon').on('click', deleteAnnouncement)
})

function appendNewAnnouncement(announcementData) {
  // prettier-ignore
  let newAnnouncementHTML = [
    '<li class="announcement text-center">',
      '<h2 class="ucla-blue">', announcementData.header, '</h2>',
      '<p>', announcementData.body, '</p>',
    '</li>'
  ].join('')

  $(newAnnouncementHTML).prependTo('.announcements-list')
}

function deleteAnnouncement() {
  if (confirm('Are you sure you want to delete this announcement?')) {
    let id = this.id

    let apiURL = '/admin/announcements/delete/' + id

    $.ajax({ url: apiURL, type: 'POST' }).done(response => {
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
