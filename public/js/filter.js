function filter() {
  let searchBarValue = $('input.filter').val()
  for (let part of $('ul.filter-list').children()) {
    let keyValue = ''
    $(part)
      .find('.filter-key')
      .each((i, el) => {
        keyValue += $(el).text()
      })
    keyValue = keyValue.toUpperCase()
    if (keyValue.indexOf(searchBarValue.toUpperCase()) > -1) {
      $(part).fadeIn(300)
    } else {
      $(part).fadeOut(300)
    }
  }
}
