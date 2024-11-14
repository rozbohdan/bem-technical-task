const SELECT = '[data-select]'
const SELECT_LIST = '[data-select-list]'
const SELECT_ARROW = '[data-select-arrow]'
const SELECT_ACTION = '[data-select-action]'
const SELECT_TITLE = '[data-select-title]'
const SELECT_INPUT = '[data-select-input]'
const SELECT_ITEM = 'selectItem'
const OPEN_SELECT = 'selectOpen'

class Select {
    static attach() {
        const select = new Select()
        select.init()
    }

    init() {
        if (this.findSelect()) {
            this.applyListener()
        }
    }

    applyListener() {
        document.querySelector('*').addEventListener('click', e => {
            const element = e.target.closest(SELECT_ACTION)

            if (this.isCallSelectElement(element)) {
                if (this.isOpened()) {
                    this.closeSelectList()
                } else {
                    this.openSelectList()
                }
            }

            if (this.isCallSelectItemElement(element)) {
                this.addSelectedValue(element)
            }

            if (this.isCallSelectElement(element) !== true && this.selectOverlayIsClickedElement(element) !== true) {
                if (this.isOpened()) {
                    this.closeSelectList()
                }
            }
        })
    }

    isCallSelectElement(element) {
        return element && OPEN_SELECT in element.dataset
    }

    isCallSelectItemElement(element) {
        return element && SELECT_ITEM in element.dataset
    }

    findSelect() {
        const select = document.querySelector(SELECT)

        if (select) {
            this.select = select
            this.selectList = this.select.querySelector(SELECT_LIST)
            this.selectArrow = this.select.querySelector(SELECT_ARROW)
            this.selectTitle = this.select.querySelector(SELECT_TITLE)
            this.selectInput = this.select.querySelector(SELECT_INPUT)
            return true
        }
        return false
    }

    isOpened() {
        return this.selectList.classList.contains('select__list_opened')
    }

    openSelectList() {
        this.selectList.classList.add('select__list_opened')
        this.selectArrow.classList.add('select__arrow_rotate')
    }

    closeSelectList() {
        this.selectList.classList.remove('select__list_opened')
        this.selectArrow.classList.remove('select__arrow_rotate')
    }

    addSelectedValue(element) {
        this.selectTitle.innerHTML = element.innerHTML
        this.selectInput.value = element.innerHTML
    }

    selectOverlayIsClickedElement(element) {
        return element && 'select' in element.dataset
    }
}

Select.attach()
