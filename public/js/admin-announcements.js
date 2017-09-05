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
    '<li>',
      '<h1>', announcementData.header, '</h1>',
      '<p>', announcementData.body, '</p>',
      '<p>', announcementData.category, '</p>',
    '</li>'
  ].join('')

  $(newAnnouncementHTML).prependTo('.announcements-list')
}