export class ContactForm {
  constructor(modalElement, openElement, closeElement, photographer) {
    this.modal = document.getElementById(modalElement)
    this.openElement = document.getElementById(openElement)
    this.closeElement = document.getElementById(closeElement)
    this.photographer = photographer
    this.modalForm = this.modal.getElementsByTagName("FORM")[0]
    this.inputElements = Array.from(this.modalForm.elements)
  }

  setAccessibility() {
    const title = document.querySelector(".modal__title")
    const name = document.createTextNode(this.photographer)
    const br = document.createElement("br")
    title.append(br, name)

    const modalArialLabelledBy = document.createAttribute("aria-labelledby")
    modalArialLabelledBy.value = "modalTitle"
    this.modal.setAttributeNode(modalArialLabelledBy)

    const closeElementAriaLabel = document.createAttribute("aria-label")
    closeElementAriaLabel.value = "Close Contact form"
    this.closeElement.setAttributeNode(closeElementAriaLabel)
  }

  static initElements(modal) {
    modal.openElement.addEventListener("click", () => {
      modal.modal.style.display = "block"
    })

    modal.closeElement.addEventListener("click", () => {
      modal.modal.style.display = "none"
    })

    modal.modalForm.addEventListener("submit", (event) => {
      event.preventDefault()
      modal.inputElements.forEach((element) => {
        if (element.tagName !== "BUTTON") {
          console.log(element.value)
          element.value = ""
        }
      })
      modal.modal.style.display = "none"
    })

    modal.setAccessibility()
  }
}
