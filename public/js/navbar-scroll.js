$(document).ready(function() {
  // logic for smooth scrolling animation after tab is clicked
  $(".myNavbar a, .mobile-nav-list a").click(function(e) {
    if (this.hash !== "") {
      e.preventDefault()
      let hash = this.hash
      $("html, body").animate({ scrollTop: $(hash).offset().top }, 400, () => {
        window.location.hash = hash
      })
    }
  })
})
