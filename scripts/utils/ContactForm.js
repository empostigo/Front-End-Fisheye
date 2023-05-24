export class ContactForm {
  constructor(modalElement, openElement, closeElement) {
    this.modal = document.getElementById(modalElement)
    this.openElement = document.getElementById(openElement)
    this.closeElement = document.getElementById(closeElement)
  }

  static initElements(modal) {
    modal.openElement.addEventListener("click", () => {
      modal.modal.style.display = "block"
    })
    modal.closeElement.addEventListener("click", () => {
      modal.modal.style.display = "none"
    })
  }
}
