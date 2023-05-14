function photographerFactory(data) {
  const { portrait, name, city, country, tagline, price } = data
  const picture = `assets/photographers/${portrait}`

  // set class name, used in BEM notation
  const articleClass = "photographer"
  const imgClass = `${articleClass}__portrait`
  const h2Class = `${articleClass}__heading`

  function getUserCardDOM() {
    const article = document.createElement("article")
    article.className = articleClass
    const img = document.createElement("img")
    img.className = imgClass
    img.setAttribute("src", picture)
    const h2 = document.createElement("h2")
    h2.className = h2Class
    h2.textContent = name
    article.appendChild(img)
    article.appendChild(h2)
    return article
  }
  return { name, picture, getUserCardDOM }
}
