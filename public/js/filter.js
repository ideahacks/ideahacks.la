function filter() {
  let searchBarValue = $('input.filter').val()
  for (let part of $('ul.filter-list').children()) {
    let keyValue = $(part)
      .find('.filter-key')
      .html()
      .toUpperCase()
    if (keyValue.indexOf(searchBarValue.toUpperCase()) > -1) {
      $(part).css('display', '')
    } else {
      $(part).css('display', 'none')
    }
  }
}
