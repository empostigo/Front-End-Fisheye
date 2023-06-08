export class ContactForm {
  constructor(photographer) {
    this.modal = document.getElementById("contactModal")
    this.openElement = document.getElementById("openModal")
    this.closeElement = document.getElementById("closeModal")
    this.photographer = photographer
    this.modalForm = document.getElementById("modalForm")
    this.inputElements = Array.from(this.modalForm.elements).filter(
      (element) => element.tagName === "INPUT" || element.tagName === "TEXTAREA"
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
      })

      modal.modalForm.reset()
      modal.hideModal()
    })

    modal.modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") modal.hideModal()
    })

    modal.setAccessibility()
  }
}
