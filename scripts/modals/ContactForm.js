export class ContactForm {
  constructor(photographerName) {
    // Contact modal elements
    this.modal = document.getElementById("contactModal")
    this.modalForm = document.getElementById("modalForm")
    this.openElement = document.getElementById("openModal") // Button in the photographer header in html
    this.closeElement = document.getElementById("closeModal")

    this.photographerName = photographerName

    // Needed to log user input values in the console
    this.inputElements = Array.from(this.modalForm.elements).filter(
      (element) => element.tagName === "INPUT" || element.tagName === "TEXTAREA"
    )
  }

  setAccessibility() {
    // "Contactez-moi\n Name of the photographer"
    const title = document.querySelector(".modal__title")
    const name = document.createTextNode(this.photographerName)
    const br = document.createElement("br")
    title.append(br, name)

    // Contact modal is labelled by its h2 heading
    const modalAriaLabelledBy = document.createAttribute("aria-labelledby")
    modalAriaLabelledBy.value = "modalTitle"
    this.modal.setAttributeNode(modalAriaLabelledBy)

    const closeElementAriaLabel = document.createAttribute("aria-label")
    closeElementAriaLabel.value = "Close Contact form"
    this.closeElement.setAttributeNode(closeElementAriaLabel)
  }

  hideModal() {
    this.modal.style.display = "none"
  }

  showModal() {
    this.modal.style.display = "block"
  }

  static initElements(modal) {
    /* /////////////////////////////////////////////// */
    // Open modal
    modal.openElement.addEventListener("click", () => {
      modal.showModal()
      modal.modal.focus()
    })

    /* /////////////////////////////////////////////// */
    // Close modal
    modal.closeElement.addEventListener("click", () => {
      modal.hideModal()
    })

    modal.closeElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") modal.hideModal()
    })

    /* /////////////////////////////////////////////// */
    // Log user input in console
    modal.modalForm.addEventListener("submit", (event) => {
      event.preventDefault()
      modal.inputElements.forEach((element) => {
        console.log(element.value)
      })

      // Remove user inputs and closing modal
      modal.modalForm.reset()
      modal.hideModal()
    })

    modal.modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") modal.hideModal()
    })

    modal.setAccessibility()
  }
}
