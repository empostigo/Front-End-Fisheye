class HomePage extends BasePage {
  constructor(photographer) {
    super(photographer)
  }

  getUserCardDOM = () => {
    // set class name, use BEM notation
    const articleClass = "photographer"
    const imgClass = `${articleClass}__portrait`
    const h2Class = `${articleClass}__heading`
    const descriptionClass = `${articleClass}__description`
    const locationClass = `${articleClass}__location`
    const pTagLineClass = `${articleClass}__tagline`
    const costClass = `${articleClass}__price`

    const article = document.createElement("article")
    article.className = articleClass

    const img = document.createElement("img")
    img.className = imgClass
    img.setAttribute("src", this.picture)

    const h2 = document.createElement("h2")
    h2.className = h2Class
    h2.textContent = this.name

    const description = document.createElement("div")
    description.className = descriptionClass

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

    article.appendChild(img)
    article.appendChild(h2)
    article.appendChild(description)

    return article
  }
}
