export class Sorting {
  constructor(sortingElement) {
    this.sortingElement = sortingElement
    this.categories = document.querySelector(".sorting__categories")
    this.sortingOptions = Array.from(
      document.querySelectorAll(".sorting__option")
    )
    this.sortingElement.style.display = "inline"
    this.up = document.getElementById("up")
    this.down = document.getElementById("down")
  }

  // Display arrow up icon listbox
  openedDropDown() {
    this.up.classList.remove("sorting__icon--hidden")
    this.down.classList.add("sorting__icon--hidden")
    this.sortingElement.setAttribute("aria-expanded", true)
  }

  // Display arrow down icon listbox
  closedDropDown() {
    this.up.classList.add("sorting__icon--hidden")
    this.down.classList.remove("sorting__icon--hidden")
    this.sortingElement.setAttribute("aria-expanded", false)
  }

  displayOption(index) {
    this.sortingOptions.forEach((element) => {
      element.classList.add("sorting__option--hidden")
      element.classList.remove("sorting__option--no-border")
      element.setAttribute("aria-selected", false)
      element.tabIndex = -1
    })
    this.closedDropDown()
    const displayedOption = this.sortingOptions[index]
    displayedOption.classList.add("sorting__option--all-border")
    displayedOption.classList.remove("sorting__option--hidden")
    displayedOption.setAttribute("aria-selected", true)

    this.sortingElement.style.zIndex = 2
  }

  displayAllOptions() {
    this.openedDropDown()
    this.sortingOptions.forEach((element) => {
      element.className = "sorting__option"
      element.tabIndex = 0
    })
    this.sortingOptions[0].classList.add("sorting__option--top-border")
    this.sortingOptions[0].classList.add("sorting__option--no-border")

    this.sortingOptions[2].classList.add("sorting__option--radius-border")
    this.sortingElement.style.zIndex = 0

    this.sortingOptions[this.sortingElement.dataset.indexNumber % 10].focus()
  }

  static initElements(sortingObject) {
    sortingObject.displayOption(0)
    sortingObject.categories.classList.remove("sorting__categories--hidden")

    let flag = 0
    const toggleSelectState = () => {
      if (flag++ % 2 === 0) sortingObject.displayAllOptions()
      else {
        sortingObject.displayOption(
          sortingObject.sortingElement.dataset.indexNumber % 10
        )
      }
    }
    sortingObject.sortingElement.addEventListener("click", toggleSelectState)

    sortingObject.sortingOptions.forEach((element) =>
      element.addEventListener("click", () => {
        sortingObject.displayOption(element.id % 10)
        sortingObject.sortingElement.dataset.indexNumber = element.id
      })
    )

    sortingObject.sortingOptions.forEach((element) =>
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          sortingObject.displayOption(element.id % 10)
          sortingObject.sortingElement.dataset.indexNumber = element.id
          sortingObject.sortingElement.focus()
        }
      })
    )
    /*
    let index = 0
    sortingObject.sortingElement.addEventListener("keydown", (event) => {
      //if (event.key === "Enter") event.preventDefault()
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
    */
  }
}
