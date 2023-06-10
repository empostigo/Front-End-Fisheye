export class Sorting {
  constructor(sortingElement) {
    this.sortingElement = sortingElement
    this.sortingElement.style.height = "56px"
    this.sortingElement.style.display = "initial"
  }

  openDropDown() {
    this.sortingElement.style.height = "170px"
  }

  closeDropDown() {
    this.sortingElement.style.height = "56px"
    this.sortingElement.focus()
  }

  static dropDownList(sortingObject) {
    let flag = 0
    sortingObject.sortingElement.addEventListener("click", () => {
      if (flag++ % 2 === 0) sortingObject.openDropDown()
      else sortingObject.closeDropDown()
    })
  }
}
