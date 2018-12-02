// function to handle logic when navbar icon pressed
function animateNavbar(navbarIcon) {
	navbarIcon.classList.toggle("change")
	toggleMobileNav()
}

function toggleMobileNav() {
	let idText = "mobile-navbar-list"
	if (document.getElementById(idText).style.height === "auto") {
		document.getElementById(idText).style.height = "0%"
	} else {
		document.getElementById(idText).style.height = "auto"
	}
}

function toggleResponsiveActive() {
	let x = document.getElementById("responsive-content")
	if (x.className === "responsive-dropdown-content") {
		x.className += " active"
	} else {
		x.className = "responsive-dropdown-content"
	}

	let dropdownArrow = document.getElementById("dropdown-arrow")
	if (dropdownArrow.style.transform === "rotate(180deg)") {
		dropdownArrow.style.transform = "none"
	} else {
		dropdownArrow.style.transform = "rotate(180deg)"
	}
}
