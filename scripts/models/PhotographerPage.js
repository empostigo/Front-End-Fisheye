import { BasePage } from "./BasePage.js"

export class PhotographerPage extends BasePage {
  constructor(photographer) {
    super(photographer)
  }

  getUserCardDOM = () => {
    // set class names , BEM notation
    const parentClass = "photographer-header"
    const descriptionClass = `${parentClass}__description`
    const infosClass = `${parentClass}__infos`
    const h1Class = `${parentClass}__heading`
    const locationClass = `${parentClass}__location`
    const pTagLineClass = `${parentClass}__tagline`
    const imageClass = `${parentClass}__portrait`

    // Name, city, country and tagline
    const h1 = document.createElement("h1")
    h1.className = h1Class
    h1.textContent = this.name
    h1.tabIndex = 0

    const location = document.createElement("p")
    location.className = locationClass
    location.textContent = this.place

    const pTagLine = document.createElement("p")
    pTagLine.className = pTagLineClass
    pTagLine.textContent = this.tagline

    const infos = document.createElement("div")
    infos.className = infosClass
    infos.tabIndex = 0
    infos.appendChild(location)
    infos.appendChild(pTagLine)

    const description = document.createElement("div")
    description.className = descriptionClass
    description.appendChild(h1)
    description.appendChild(infos)

    // displaying portrait
    const image = document.createElement("img")
    image.className = imageClass
    image.setAttribute("src", this.picture)
    image.tabIndex = 0

    return { description, image }
  }
}
