function animateDropdown(button) {
    var chevron = $(button).find("span")[0]
    var logos = $(button).next()[0]

    chevron.classList.toggle("chevron-rotate")
    logos.classList.toggle("sponsor-visible")
}