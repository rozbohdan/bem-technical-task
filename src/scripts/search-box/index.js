const SEARCH_BOX = '[data-search-box]'
const SEARCH_ACTION = '[data-search-action]'
const OPEN_SEARCH_BOX = 'searchOpen'

class Search {
  static attach() {
    const search = new Search()
    search.init()
  }

  init() {
    if (this.findSearchBox()) {
      this.applyListener()
    }
  }

  applyListener() {
    document.querySelector('*').addEventListener('click', e => {
      const element = e.target.closest(SEARCH_ACTION)
      const searchBox = e.target.closest(SEARCH_BOX)

      if (this.isOpened() !== true && window.matchMedia("(max-width: 768px)").matches) {
        e.preventDefault()
      }

      if (this.isCallSearchBoxElement(element) && window.matchMedia("(max-width: 768px)").matches) {
        this.openSearchBox()
      }

      if (this.isCallSearchBoxElement(element) !== true && this.searchBoxOverlayIsClickedElement(searchBox) !== true) {
        if (this.isOpened()) {
          this.closeSearchBox()
        }
      }
    })
  }

  isCallSearchBoxElement(element) {
    return element && OPEN_SEARCH_BOX in element.dataset
  }

  findSearchBox() {
    const search = document.querySelector(SEARCH_BOX)

    if (search) {
      this.search = search
      return true
    }
    return false
  }

  isOpened() {
    return this.search.classList.contains('search-box_opened')
  }

  openSearchBox() {
    this.search.classList.add('search-box_opened')
  }

  closeSearchBox() {
    this.search.classList.remove('search-box_opened')
  }

  searchBoxOverlayIsClickedElement(searchBox) {
    return searchBox && 'searchBox' in searchBox.dataset
  }
}

Search.attach()
