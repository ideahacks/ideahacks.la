$(() => {
  $('.application-form').submit(e => e.preventDefault())

  $('.submit-application').click(() => getAndSendApplicationData())
})

function getAndSendApplicationData() {
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
    hasTeam: $('select[name="hasTeam"]').find(':selected').text(),
    teammates: teammateEmails,
    foodRestrictions: $('input[name="foodRestrictions"]').val(),
    vehicleNeed: $('select[name="vehicleNeed"]').find(':selected').text(),
    skillsAndExperience: $('textarea[name="skillsAndExperience"]').val(),
    pastHackathonExperience: $('textarea[name="pastHackathonExperience"]').val(),
    reasonForParticipation: $('textarea[name="reasonForParticipation"]').val(),
    themeIdea: $('textarea[name="themeIdea"]').val(),
    desiredParts: $('textarea[name="desiredParts"]').val()
  }

  $.ajax({ url: '/dashboard/application', type: 'POST', data: applicationData }).done(response =>{
      if(response.status === 'success'){
          $('.submit-message').text(response.message)
      }
      else if(response.status === 'failure'){
          $('.submit-message').text(response.message)
      }
  })
}
