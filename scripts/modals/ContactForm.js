export class ContactForm {
  constructor(photographer) {
    this.modal = document.getElementById("contactModal")
    this.openElement = document.getElementById("openModal")
    this.closeElement = document.getElementById("closeModal")
    this.photographer = photographer
    this.modalForm = document.getElementById("modalForm")
    this.inputElements = Array.from(this.modalForm.elements).filter(
      (element) => element.tagName !== "BUTTON"
    )
  }

  setAccessibility() {
    const title = document.querySelector(".modal__title")
    const name = document.createTextNode(this.photographer)
    const br = document.createElement("br")
    title.append(br, name)

    const modalAriaLabelledBy = document.createAttribute("aria-labelledby")
    modalAriaLabelledBy.value = "modalTitle"
    this.modal.setAttributeNode(modalAriaLabelledBy)

    const closeElementAriaLabel = document.createAttribute("aria-label")
    closeElementAriaLabel.value = "Close Contact form"
    this.closeElement.setAttributeNode(closeElementAriaLabel)

    const labels = []
    this.inputElements.forEach((element) => labels.push(element.labels[0]))
    const labelIds = ["FirstName", "LastName", "Email", "YourMessage"]
    labels.map((element, counter) => (element.id = labelIds[counter]))

    let tmpAria
    const ariaLabelledByArray = []
    labelIds.forEach((element) => {
      tmpAria = document.createAttribute("aria-labelledby")
      tmpAria.value = element
      ariaLabelledByArray.push(tmpAria)
    })
    this.inputElements.forEach((element, counter) =>
      element.setAttributeNode(ariaLabelledByArray[counter])
    )
  }

  hideModal() {
    this.modal.style.display = "none"
  }

  showModal() {
    this.modal.style.display = "block"
  }

  static initElements(modal) {
    modal.openElement.addEventListener("click", () => {
      modal.showModal()
      modal.modal.focus()
    })

    modal.closeElement.addEventListener("click", () => {
      modal.hideModal()
    })

    modal.closeElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") modal.hideModal()
    })

    modal.modalForm.addEventListener("submit", (event) => {
      event.preventDefault()
      modal.inputElements.forEach((element) => {
        console.log(element.value)
        element.value = ""
      })

      modal.hideModal()
    })

    modal.modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") modal.hideModal()
    })

    modal.setAccessibility()
  }
}
