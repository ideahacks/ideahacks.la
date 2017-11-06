$(() => {
  $('.submit-application').click(() => getAndSendApplicationData(true))

  $('.save-application').click(() => getAndSendApplicationData(false))

  $('input, textarea, select').focus(() => $('.submit-message').css('color', 'transparent'))
})

function getAndSendApplicationData(toggleHasApplication) {
  let teammateEmails = []
  $('.teammate-email').each((i, el) => {
    if (el.value !== '') teammateEmails.push(el.value)
  })

  let applicationData = {
    firstName: $('input[name="firstName"]').val(),
    lastName: $('input[name="lastName"]').val(),
    phone: $('input[name="phone"]').val(),
    school: $('input[name="school"]').val(),
    major: $('input[name="major"]').val(),
    year: $('input[name="year"]').val(),
    github: $('input[name="github"]').val(),
    linkedin: $('input[name="linkedin"]').val(),
    hasTeam: $('select[name="hasTeam"]')
      .find(':selected')
      .text(),
    teammates: teammateEmails,
    foodRestrictions: $('input[name="foodRestrictions"]').val(),
    skillsAndExperience: $('textarea[name="skillsAndExperience"]').val(),
    pastHackathonExperience: $('textarea[name="pastHackathonExperience"]').val(),
    reasonForParticipation: $('textarea[name="reasonForParticipation"]').val(),
    themeIdea: $('textarea[name="themeIdea"]').val(),
    desiredParts: $('input[name="desiredParts"]').val(),
    shirtSize: $('select[name="shirtSize"]')
      .find(':selected')
      .text(),
    hasApplication: toggleHasApplication
  }

  $.ajax({ url: '/dashboard/application', type: 'POST', data: applicationData }).done(response => {
    $('.submit-message').text(response.message)
    $('.submit-message').css('color', '#ffb718')
  })
}
