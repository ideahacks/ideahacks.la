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
	// let teammateNames = []
	// $(".teammate-name").each((i, el) => {
	// 	if (el.value !== "") teammateNames.push(el.value)
	// })

	// find school entry
	let school_entry = $('select[name="school"]')
		.find(":selected")
		.text()
	if (school_entry == "Other") {
		school_entry = $('input[name="school_other"]').val()
	}
	if (school_entry == "") {
		alert("Please specify your school.")
		return false
	}

	// get gender
	// let gender_entry = $('select[name="gender"]')
	// 	.find(":selected")
	// 	.text()
	// if (gender_entry == "Other") {
	// 	gender_entry = $('input[name="gender_other"]').val()
	// }

	// if (gender_entry == "") {
	// 	alert("Please specify your self-identified gender.")
	// 	return false
	// }

	//get box preferences
	let boxPreferenceOne_entry = $('select[name="boxRanking1"]')
		.find(":selected")
		.text()
	let boxPreferenceTwo_entry = $('select[name="boxRanking2"]')
		.find(":selected")
		.text()
	let boxPreferenceThree_entry = $('select[name="boxRanking3"]')
		.find(":selected")
		.text()
	if (
		boxPreferenceOne_entry == boxPreferenceTwo_entry ||
		boxPreferenceOne_entry == boxPreferenceThree_entry ||
		boxPreferenceTwo_entry == boxPreferenceThree_entry
	) {
		alert("Please choose unique boxes for each option")
		return false
	}

	// check that mandatory fields filled out
	if (
		$('input[name="firstName"]').val() == "" ||
		$('input[name="lastName"]').val() == "" ||
		$('input[name="phone"]').val() == "" ||
		$('input[name="major"]').val() == "" ||
		$('textarea[name="skillsAndExperience"]').val() == "" ||
		$('textarea[name="reasonForParticipation"]').val() == "" ||
		$('textarea[name="address"]').val()
	) {
		alert("Please fill out required fields before submitting application.")
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

	let hasExperience = false
	if (
		$('select[name="hasHackathonExperience"]')
			.find(":selected")
			.text() == "YES"
	) {
		hasExperience = true
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
		// gender: gender_entry,
		github: $('input[name="github"]').val(),
		linkedin: $('input[name="linkedin"]').val(),
		resume: $('input[name="resume"]').val(),
		hasTeam: $('select[name="hasTeam"]')
			.find(":selected")
			.text(),
		teammates: teammateEmails,
		// teammates_names: teammateNames,
		//foodRestrictions: $('input[name="foodRestrictions"]').val(),
		skillsAndExperience: $('textarea[name="skillsAndExperience"]').val(),
		hasPastHackathonExperience: hasExperience,
		pastHackathonExperience: $('textarea[name="pastHackathonExperience"]').val(),
		reasonForParticipation: $('textarea[name="reasonForParticipation"]').val(),
		themeIdea: $('textarea[name="themeIdea"]').val(),
		//desiredParts: $('textarea[name="desiredParts"]').val(),
		shirtSize: $('select[name="shirtSize"]')
			.find(":selected")
			.text(),
		// needParking: $('select[name="needsParking"]')
		// 	.find(":selected")
		// 	.text(),
		boxPreferenceOne: boxPreferenceOne_entry,
		boxPreferenceTwo: boxPreferenceTwo_entry,
		boxPreferenceThree: boxPreferenceThree_entry,
		shippingAddress: $('textarea[name="address"]').val(),
		hasApplication: toggleHasApplication
	}
	console.log(applicationData)

	$.ajax({
		url: "/dashboard/application",
		type: "POST",
		data: applicationData
	}).done(response => {
		location.reload()
	})
}
