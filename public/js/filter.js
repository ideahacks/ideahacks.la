function filter() {
  let searchBar, searchBarInput, partsListUl, partsListLi, partsListH3
  searchBar = document.getElementById('filter-input')
  searchBarInput = searchBar.value.toUpperCase()
  partsListUl = document.getElementById('filter')
  partsListLi = partsListUl.getElementsByTagName('li')
  for (let k = 0; k < partsListLi.length; k++) {
    p = partsListLi[k].getElementsByTagName('h3')[0]
    if (p.innerHTML.toUpperCase().indexOf(searchBarInput) > -1) {
      partsListLi[k].style.display = ''
    } else {
      partsListLi[k].style.display = 'none'
    }
  }
}
