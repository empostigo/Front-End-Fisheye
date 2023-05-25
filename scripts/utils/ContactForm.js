export class ContactForm {
  constructor(modalElement, openElement, closeElement, modalForm) {
    this.modal = document.getElementById(modalElement)
    this.openElement = document.getElementById(openElement)
    this.closeElement = document.getElementById(closeElement)
    this.modalForm = document.getElementById(modalForm)
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

      Array.from(modal.modalForm.elements).forEach((element) => {
        if (element.tagName !== "BUTTON") {
          console.log(element.value)
          element.value = ""
        }
      })

      modal.modal.style.display = "none"
    })
  }
}
