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

  // Style applied when the listbox is closed
  displayOption(index) {
    this.sortingOptions.forEach((element) => {
      element.classList.add("sorting__option--hidden")
      element.classList.remove("sorting__option--no-border")
      element.setAttribute("aria-selected", false)
    })
    this.closedDropDown()
    const displayedOption = this.sortingOptions[index]
    displayedOption.classList.add("sorting__option--all-border")
    displayedOption.classList.remove("sorting__option--hidden")
    displayedOption.setAttribute("aria-selected", true)
  }

  // Style applied when the listbox is opened
  displayAllOptions() {
    this.openedDropDown()
    this.sortingOptions.forEach((element) => {
      element.className = "sorting__option"
    })
    this.sortingOptions[0].classList.add("sorting__option--top-border")
    this.sortingOptions[0].classList.add("sorting__option--no-border")
    this.sortingOptions[2].classList.add("sorting__option--radius-border")

    this.sortingOptions[this.sortingElement.dataset.indexNumber % 10].focus()
  }

  static initElements(sortingObject) {
    // Start with "Popularité" option displayed
    // See photographer.js line 14, where the medias array is created
    sortingObject.displayOption(0)

    let flag = 0 // Used to open or close the listbox
    const toggleSelectState = () => {
      if (flag++ % 2 === 0) {
        sortingObject.displayAllOptions()
      } else {
        sortingObject.displayOption(
          // Ids of li tags are: 10, 11 or 12, % 10 gives us the index in the array
          // dataset is used to sorting the array, see photographer.js, line 35
          sortingObject.sortingElement.dataset.indexNumber % 10
        )
      }
    }
    sortingObject.sortingElement.addEventListener("click", toggleSelectState)
    sortingObject.sortingElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") toggleSelectState()
    })
    sortingObject.sortingElement.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        event.preventDefault()
        toggleSelectState()
      }
    })

    sortingObject.sortingOptions.forEach((element) =>
      element.addEventListener("click", () => {
        sortingObject.sortingElement.dataset.indexNumber = element.id
      })
    )
    sortingObject.sortingOptions.forEach((element) =>
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter")
          sortingObject.sortingElement.dataset.indexNumber = element.id
      })
    )
    sortingObject.sortingOptions.forEach((element) =>
      element.addEventListener("keydown", (event) => {
        if (event.key === " ") {
          event.preventDefault()
          sortingObject.sortingElement.dataset.indexNumber = element.id
        }
      })
    )
  }
}
