import { BasePage } from "./BasePage.js"

export class PhotographerPage extends BasePage {
  constructor(photographer) {
    super(photographer)
  }

  getUserCardDOM = () => {
    // set class names , BEM notation
    const parentClass = "photographer-header"
    const descriptionClass = `${parentClass}__description`
    const h1Class = `${parentClass}__heading`
    const locationClass = `${parentClass}__location`
    const pTagLineClass = `${parentClass}__tagline`
    const imageClass = `${parentClass}__portrait`

    // Name, city, country and tagline
    const description = document.createElement("div")
    description.className = descriptionClass

    const h1 = document.createElement("h1")
    h1.className = h1Class
    h1.textContent = this.name

    const location = document.createElement("p")
    location.className = locationClass
    location.textContent = this.place

    const pTagLine = document.createElement("p")
    pTagLine.className = pTagLineClass
    pTagLine.textContent = this.tagline

    description.appendChild(h1)
    description.appendChild(location)
    description.appendChild(pTagLine)

    // displaying portrait
    const image = document.createElement("img")
    image.className = imageClass
    image.setAttribute("src", this.picture)

    return { description, image }
  }
}
