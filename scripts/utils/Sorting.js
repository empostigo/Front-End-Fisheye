export class Sorting {
  constructor(sortingElement) {
    this.sortingElement = sortingElement
    this.sortingOptions = Array.from(
      document.querySelectorAll(".sorting__option")
    )
    this.sortingElement.style.display = "inline"
    this.up = document.getElementById("up")
    this.down = document.getElementById("down")
  }

  openDropDown() {
    this.up.classList.add("sorting__icon--hidden")
    this.down.classList.remove("sorting__icon--hidden")
    this.sortingElement.setAttribute("aria-expanded", true)
  }

  closeDropDown() {
    this.up.classList.remove("sorting__icon--hidden")
    this.down.classList.add("sorting__icon--hidden")
    this.sortingElement.setAttribute("aria-expanded", false)
  }

  displayOption(index) {
    this.closeDropDown()
    this.sortingOptions.forEach((element) => {
      element.classList.add("sorting__option--hidden")
      element.classList.remove("sorting__option--top-border")
      element.setAttribute("aria-selected", false)
    })
    this.sortingOptions[index].classList.remove("sorting__option--hidden")
    this.sortingOptions[index].classList.add("sorting__option--top-border")
    this.sortingOptions[index].setAttribute("aria-selected", true)
  }

  displayAllOptions() {
    this.openDropDown()
    this.sortingOptions.forEach((element) => {
      element.classList.remove("sorting__option--hidden")
      element.classList.remove("sorting__option--top-border")
    })
    this.sortingOptions[0].classList.add("sorting__option--top-border")
  }

  static initElements(sortingObject) {
    sortingObject.displayOption(0)

    let flag = 0
    sortingObject.sortingElement.addEventListener("click", () => {
      if (flag++ % 2 === 0) {
        sortingObject.displayAllOptions()
        sortingObject.openDropDown()
      } else sortingObject.closeDropDown()
    })

    sortingObject.sortingOptions.forEach((element) =>
      element.addEventListener("click", () => {
        sortingObject.displayOption(element.id % 10)
        sortingObject.sortingElement.dataset.indexNumber = element.id
      })
    )

    let index = 0
    sortingObject.sortingElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") event.preventDefault()
      if (event.key === "ArrowDown") {
        event.preventDefault()
        if (++index < sortingObject.sortingOptions.length) {
          sortingObject.displayOption(index)
          sortingObject.sortingElement.dataset.indexNumber =
            sortingObject.sortingOptions[index].id
        }
        if (index === sortingObject.sortingOptions.length) index--
      }

      if (event.key === "ArrowUp") {
        event.preventDefault()
        if (--index >= 0) {
          sortingObject.displayOption(index)
          sortingObject.sortingElement.dataset.indexNumber =
            sortingObject.sortingOptions[index].id
        }
        if (index < 0) index = 0
      }
    })
  }
}
