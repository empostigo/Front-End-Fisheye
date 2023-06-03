export class ContactForm {
  constructor(modalElement, openElement, closeElement, photographer) {
    this.modal = document.getElementById(modalElement)
    this.openElement = document.getElementById(openElement)
    this.closeElement = document.getElementById(closeElement)
    this.photographer = photographer
    this.modalForm = this.modal.getElementsByTagName("FORM")[0]
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

  static initElements(modal) {
    modal.openElement.addEventListener("click", () => {
      modal.modal.style.display = "block"
      const contactModal = document.getElementById("contactModal")
      contactModal.focus()
    })

    modal.closeElement.addEventListener("click", () => {
      modal.modal.style.display = "none"
    })

    modal.modalForm.addEventListener("submit", (event) => {
      event.preventDefault()
      modal.inputElements.forEach((element) => {
        console.log(element.value)
        element.value = ""
      })

      modal.modal.style.display = "none"
    })

    modal.setAccessibility()
  }
}
