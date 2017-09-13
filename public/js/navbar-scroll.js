$(document).ready(function() {
  // function fired whenever window scrolls
  $(window).scroll(function() {
    // if window scrolled more than 75px
    if ($(document).scrollTop() > 75) {
      $('.myNavbar').css('background-color', 'white')
      $('.myNavbar li a').css('color', 'black')
    } else {
      $('.myNavbar').css('background-color', 'transparent')
      $('.myNavbar li a').css('color', 'white')
    }
  })
})
