// function to handle logic when navbar icon pressed
function toggleNavbarIconLogic(navbarIcon) {
  navbarIcon.classList.toggle('change')
  toggleMobileNav()
}

function toggleMobileNav() {
  let idText = 'mobile-nav-list'
  if (document.getElementById(idText).style.height === 'auto') {
    document.getElementById(idText).style.height = '0%'
  } else {
    document.getElementById(idText).style.height = 'auto'
  }
}
