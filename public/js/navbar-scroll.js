$(document).ready(function() {
  // logic that handles navbar backgorund color when scrolling down
  $(window).scroll(function() {
    if ($(document).scrollTop() > 75) {
      $('.myNavbar').css('background-color', 'white')
      $('.myNavbar li a').css('color', 'black')
    } else {
      $('.myNavbar').css('background-color', 'transparent')
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
