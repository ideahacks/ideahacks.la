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
