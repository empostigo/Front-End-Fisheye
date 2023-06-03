import { BasePage } from "./BasePage.js"

export class HomePage extends BasePage {
  getUserCardDOM = () => {
    // set class name, use BEM notation
    const articleClass = "photographer"
    const anchorClass = `${articleClass}__anchor`
    const imageClass = `${articleClass}__portrait`
    const h2Class = `${articleClass}__heading`
    const descriptionClass = `${articleClass}__description`
    const locationClass = `${articleClass}__location`
    const pTagLineClass = `${articleClass}__tagline`
    const costClass = `${articleClass}__price`

    // Photographer link
    const anchor = document.createElement("a")
    anchor.className = anchorClass
    anchor.tabIndex = 0
    // Building an url with the id of the photographer
    const host = window.location.host
    const pathname = "photographer.html"
    const photographerUrl = new URL(`http://${host}/${pathname}?id=${this.id}`)
    anchor.href = photographerUrl
    // ARIA accessible name
    const anchorAriaLabel = document.createAttribute("aria-label")
    anchorAriaLabel.value = this.name
    anchor.setAttributeNode(anchorAriaLabel)

    const image = document.createElement("img")
    image.className = imageClass
    image.setAttribute("src", this.picture)

    const h2 = document.createElement("h2")
    h2.className = h2Class
    h2.textContent = this.name

    anchor.append(image, h2)

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

    description.append(location, pTagLine, pCost)

    // Article component
    const article = document.createElement("article")
    article.className = articleClass

    article.append(anchor, description)

    return article
  }
}
