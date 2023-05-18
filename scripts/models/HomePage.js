import { BasePage } from "./BasePage.js"

export class HomePage extends BasePage {
  constructor(photographer) {
    super(photographer)
  }

  getUserCardDOM = () => {
    // set class name, use BEM notation
    const articleClass = "photographer"
    const anchorClass = `${articleClass}__anchor`
    const imgClass = `${articleClass}__portrait`
    const h2Class = `${articleClass}__heading`
    const descriptionClass = `${articleClass}__description`
    const locationClass = `${articleClass}__location`
    const pTagLineClass = `${articleClass}__tagline`
    const costClass = `${articleClass}__price`

    // Photographer link
    const anchor = document.createElement("a")
    anchor.className = anchorClass
    anchor.tabIndex = 0
    const anchorAriaLabel = document.createAttribute("aria-label")
    anchorAriaLabel.value = this.name
    anchor.setAttributeNode(anchorAriaLabel)

    const img = document.createElement("img")
    img.className = imgClass
    img.setAttribute("src", this.picture)

    const h2 = document.createElement("h2")
    h2.className = h2Class
    h2.textContent = this.name

    anchor.appendChild(img)
    anchor.appendChild(h2)

    // Description
    const description = document.createElement("div")
    description.className = descriptionClass
    description.tabIndex = 0

    const location = document.createElement("p")
    location.className = locationClass
    location.textContent = this.place

    const pTagLine = document.createElement("p")
    pTagLine.className = pTagLineClass
    pTagLine.textContent = this.tagline

    const pCost = document.createElement("p")
    pCost.className = costClass
    pCost.textContent = this.cost

    description.appendChild(location)
    description.appendChild(pTagLine)
    description.appendChild(pCost)

    // Article component
    const article = document.createElement("article")
    article.className = articleClass

    article.appendChild(anchor)
    article.appendChild(description)

    return article
  }
}
