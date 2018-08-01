$(document).ready(function() {
  // logic that handles navbar backgorund color when scrolling down
  $(window).scroll(function() {
    if ($(document).scrollTop() > 75) {
      $('.myNavbar').css('background-color', 'rgb(221, 128, 100)')
      $('.myNavbar li a').css('color', 'white')
    } else {
      $('.myNavbar').css('background-color', 'rgb(221, 128, 100)')
      $('.myNavbar li a').css('color', 'white')
    }
  })

  // logic for smooth scrolling animation after tab is clicked
  $('.myNavbar a, .mobile-nav-list a').click(function(e) {
    if (this.hash !== '') {
      e.preventDefault()
      let hash = this.hash
      $('html, body').animate({ scrollTop: $(hash).offset().top }, 400, () => {
        window.location.hash = hash
      })
    }
  })
})
