$(() => {
  $('.radio-outer-square').click(function() {
    $('.radio-outer-square').removeClass('active')
    $(this).addClass('active')

    let chosen = $(this)
      .next()
      .html()
      .toLowerCase()
    $('input[type="radio"]').removeAttr('checked')
    $('input[value="' + chosen + '"]').click()
  })
})
