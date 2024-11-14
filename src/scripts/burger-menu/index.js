const MENU = '[data-menu]'
const MENU_ACTION = '[data-menu-action]'
const OPEN_MENU = 'menuOpen'
const body = document.querySelector('body')

class Menu {
  static attach() {
    const menu = new Menu()
    menu.init()
  }

  init() {
    if (this.findMenu()) {
      this.applyListener()
    }
  }

  applyListener() {
    document.querySelector('*').addEventListener('click', e => {
      const element = e.target.closest(MENU_ACTION)
      const menuBox = e.target.closest(MENU)

      if (this.isCallMenuElement(element)) {
        if (this.isOpened()) {
          this.closeMenu()
          this.menuBtn.classList.remove('burger-menu-btn_transformed')
          body.style.overflow = 'auto'
        } else {
          this.openMenu()
          this.menuBtn.classList.add('burger-menu-btn_transformed')
          body.style.overflow = 'hidden'
        }
      }

      if (this.isCallMenuElement(element) !== true && this.menuOverlayIsClickedElement(menuBox) !== true) {
        if (this.isOpened()) {
          this.closeMenu()
          this.menuBtn.classList.remove('burger-menu-btn_transformed')
          body.style.overflow = 'auto'
        }
      }
    })
  }

  isCallMenuElement(element) {
    return element && OPEN_MENU in element.dataset
  }

  findMenu() {
    const menu = document.querySelector(MENU)
    const menuBtn = document.querySelector(MENU_ACTION)

    if (menu && menuBtn) {
      this.menu = menu
      this.menuBtn = menuBtn
      return true
    }
    return false
  }

  isOpened() {
    return this.menu.classList.contains('nav_burger-menu-opened')
  }

  openMenu() {
    this.menu.classList.add('nav_burger-menu-opened')
  }

  closeMenu() {
    this.menu.classList.remove('nav_burger-menu-opened')
  }

  menuOverlayIsClickedElement(menuBox) {
    return menuBox && 'menu' in menuBox.dataset
  }
}

Menu.attach()
