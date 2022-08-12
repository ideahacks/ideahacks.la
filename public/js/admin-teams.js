$(document).ready(() => {
	let socket = io("/admin/teams") // open socket to the server
	let modal = document.getElementById("team-creation-modal") // Team creation modal

	// deleting team from the page
	$(".team-list").on("click", "li span.delete-team", deleteTeam)

	// Logic that runs when the Add Team button is clicked
	$('button[title="Add Team"]').click(function () {
		modal.style.display = "block"

		window.onclick = (e) => {
			if (e.target === modal) {
				modal.style.display = "none"
			}
		}
	})

	// form submission logic
	$("form").submit((e) => {
		e.preventDefault()
		userNoLongerTyping()

		let teamMembers = []
		$(".member-email").each((i, el) => {
			if (el.value !== "") teamMembers.push(el.value)
		})

		let teamData = {
			teamName: $(".team-name").val(),
			teamNumber: $(".team-number").val(),
			members: teamMembers,
			parts: [],
		}

		$.ajax({ url: "/admin/teams", type: "POST", data: teamData }).done((response) => {
			if (response.status === "failure") {
				$(".error-message").text(response.message)
			} else {
				appendNewTeam(teamData)
				socket.emit("team created", teamData)
				$("input").val("")

				// Hide the modal once form is submitted
				modal.style.display = "none"
			}
		})
	})

	// clear error message when user tries to retry
	$("input").focus(() => $(".error-message").text(""))

	// user is typing logic
	let typing = false
	let timeout
	let userNoLongerTyping = () => {
		typing = false
		socket.emit("no longer typing")
	}
	$("input").on("input", () => {
		if (typing === false) {
			typing = true
			socket.emit("user typing")
			timeout = setTimeout(userNoLongerTyping, 5000)
		} else {
			clearTimeout(timeout)
			timeout = setTimeout(userNoLongerTyping, 5000)
		}
	})
	socket.on("user typing", () => $(".user-typing-message").text("A team is being created."))
	socket.on("no longer typing", () => $(".user-typing-message").text(""))

	// append new team to list when server sends team created event
	socket.on("team created", (teamData) => appendNewTeam(teamData))
})

function appendNewTeam(teamData) {
	// prettier-ignore
	let newTeamHTML = [
    '<li>',
      '<span class="delete-team text-right" style="display: block;">&times;</span>',
      '<h2 class="ucla-blue team-name filter-key">',teamData.teamName,'</h1>',
      '<h1 class="text-right filter-key">#',teamData.teamNumber,'</h1>',
      '<h3>Team Members</h3>'
  ]
	for (let email of teamData.members) {
		newTeamHTML.push("<p>", email, "</p>")
	}
	newTeamHTML.push("<h3>Inventory</h3></li>")
	newTeamHTML = newTeamHTML.join("")

	$(newTeamHTML).prependTo(".team-list")
}

function deleteTeam() {
	if (confirm("Are you sure you want to delete this team?")) {
		let teamName = $(this).parent().find(".team-name").text()

		$.ajax({ url: "/admin/teams/delete/" + teamName, type: "DELETE" }).done((response) => {
			if (response.status === "failure") {
				$(".error-message").text(response.message)
			} else if (response.status === "success") {
				$(this).parent().remove()
			}
		})
	}
}
