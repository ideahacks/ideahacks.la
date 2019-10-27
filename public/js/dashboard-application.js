$(() => {
	$(".submit-application").click(() => getAndSendApplicationData(true))

	$(".save-application").click(() => getAndSendApplicationData(false))

	$("input, textarea, select").focus(() => $(".submit-message").css("color", "transparent"))
})

// getAndSendApplicationData grabs all the form entires, puts them into a single objects,
// and sends it over to the POST /dashboard/application endpoint for saving
function getAndSendApplicationData(toggleHasApplication) {
	//get teammate information
	let teammateEmails = []
	$(".teammate-email").each((i, el) => {
		if (el.value !== "") teammateEmails.push(el.value)
	})
	let teammateNames = []
	$(".teammate-name").each((i, el) => {
		if (el.value !== "") teammateNames.push(el.value)
	})

	//find school entry
	let school_entry = $('select[name="school"]')
		.find(":selected")
		.text()
	if (school_entry == "Other") {
		school_entry = $('input[name="school_other"]').val()
	}

	// check that mandatory fields filled out
	if (
		$('input[name="firstName"]').val() == "" ||
		$('input[name="lastName"]').val() == "" ||
		$('input[name="phone"]').val() == "" ||
		$('input[name="major"]').val() == "" ||
		$('textarea[name="skillsAndExperience"]').val() == "" ||
		$('textarea[name="reasonForParticipation"]').val() == "" ||
		$('input[name="foodRestrictions"]').val() == ""
	) {
		alert("Please fill out required fields before submitting application.")
		return false
	}
	if (school_entry == "") {
		alert("Please specify your school.")
		return false
	}

	if (
		$('select[name="hasHackathonExperience"]')
			.find(":selected")
			.text() == "YES" &&
		$('textarea[name="pastHackathonExperience"]').val() == ""
	) {
		alert("Please specify your past hackathon experience.")
		return false
	}

	let applicationData = {
		firstName: $('input[name="firstName"]').val(),
		lastName: $('input[name="lastName"]').val(),
		phone: $('input[name="phone"]').val(),
		school: school_entry,
		major: $('input[name="major"]').val(),
		year: $('select[name="year"]')
			.find(":selected")
			.text(),
		github: $('input[name="github"]').val(),
		linkedin: $('input[name="linkedin"]').val(),
		resume: $('input[name="resume"]').val(),
		hasTeam: $('select[name="hasTeam"]')
			.find(":selected")
			.text(),
		teammates: teammateEmails,
		teammates_names: teammateNames,
		foodRestrictions: $('input[name="foodRestrictions"]').val(),
		skillsAndExperience: $('textarea[name="skillsAndExperience"]').val(),
		hasPastHackathonExperience: $('select[name="hasHackathonExperience"]')
			.find(":selected")
			.text(),
		pastHackathonExperience: $('textarea[name="pastHackathonExperience"]').val(),
		reasonForParticipation: $('textarea[name="reasonForParticipation"]').val(),
		themeIdea: $('textarea[name="themeIdea"]').val(),
		desiredParts: $('textarea[name="desiredParts"]').val(),
		shirtSize: $('select[name="shirtSize"]')
			.find(":selected")
			.text(),
		// needTravelReimbursement: $('select[name="needsReimbursement"]')
		// 	.find(":selected")
		// 	.text(),
		needParking: $('select[name="needsParking"]')
			.find(":selected")
			.text(),
		hasApplication: toggleHasApplication
	}

	$.ajax({
		url: "/dashboard/application",
		type: "POST",
		data: applicationData
	}).done(response => {
		location.reload()
	})
}
