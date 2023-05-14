function photographerFactory(data) {
  // get items from data
  const { portrait, name, city, country, tagline, price } = data

  // photographer image url
  const picture = `assets/photographers/${portrait}`
  // concatenate city and country
  const place = `${city}, ${country}`
  // create cost string with price
  const cost = `${price}€/jour`

  // set class name, use in BEM notation
  const articleClass = "photographer"
  const imgClass = `${articleClass}__portrait`
  const h2Class = `${articleClass}__heading`
  const descriptionClass = `${articleClass}__description`
  const locationClass = `${articleClass}__location`
  const pTagLineClass = `${articleClass}__tagline`
  const costClass = `${articleClass}__price`

  function getUserCardDOM() {
    const article = document.createElement("article")
    article.className = articleClass

    const img = document.createElement("img")
    img.className = imgClass
    img.setAttribute("src", picture)

    const h2 = document.createElement("h2")
    h2.className = h2Class
    h2.textContent = name

    const description = document.createElement("div")
    description.className = descriptionClass

    const location = document.createElement("p")
    location.className = locationClass
    location.textContent = place

    const pTagLine = document.createElement("p")
    pTagLine.className = pTagLineClass
    pTagLine.textContent = tagline

    const pCost = document.createElement("p")
    pCost.className = costClass
    pCost.textContent = cost

    description.appendChild(location)
    description.appendChild(pTagLine)
    description.appendChild(pCost)

    article.appendChild(img)
    article.appendChild(h2)
    article.appendChild(description)

    return article
  }

  return { name, picture, getUserCardDOM }
}
