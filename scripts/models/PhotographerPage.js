import { BasePage } from "./BasePage.js"

export class PhotographerPage extends BasePage {
  constructor(photographer, medias) {
    super(photographer)
    this.medias = medias
    /*
    this.photographerId = media.photographerId
    this.title = media.title
    if (Object.keys(media).includes("image")) this.image = media.image
    if (Object.keys(media).includes("video")) this.image = media.video
    this.date = media.date
    this.mediaPrice = media.price
    */
  }

  countLikes() {
    let count = 0
    for (let media of this.medias) count += media.likes
    return count
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
    const likesClass = `${parentClass}__likes`
    const dayPriceClass = `${parentClass}__day-price`
    const insertClass = `${parentClass}__insert`

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

    const likes = document.createElement("span")
    likes.className = likesClass
    likes.textContent = `${this.countLikes()} \u2665`

    const dayPrice = document.createElement("span")
    dayPrice.className = dayPriceClass
    dayPrice.textContent = this.cost

    const insert = document.createElement("div")
    insert.className = insertClass
    insert.tabIndex = 0
    insert.appendChild(likes)
    insert.appendChild(dayPrice)

    return { description, image, insert }
  }

  getUserWorkCard(media) {
    // class names
    const mediaCardClass = "mediaCard"
    const imageClass = `${mediaCardClass}__image`
    const anchorClass = `${mediaCardClass}__anchor`
    const h2Class = `${mediaCardClass}__title`
    const nbLikesClass = `${mediaCardClass}__nbLikes`
    const likeIconClass = `${mediaCardClass}__likeIcon`
    const likeDivClass = `${mediaCardClass}__likeDiv`
    const descriptionClass = `${mediaCardClass}__description`

    // card component
    const image = document.createElement("img")
    image.className = imageClass
    if (Object.keys(media).includes("image")) {
      image.src = `/assets/works/${this.name}/${media.image}`
    }
    const anchor = document.createElement("a")
    anchor.className = anchorClass
    anchor.href = "#"
    const anchorAriaLabel = document.createAttribute("aria-label")
    anchorAriaLabel.value = `${media.title}, closeup view`
    anchor.tabIndex = 0
    anchor.setAttributeNode(anchorAriaLabel)
    anchor.appendChild(image)

    const h2 = document.createElement("h2")
    h2.className = h2Class
    h2.textContent = media.title
    h2.tabIndex = 0

    const nbLikes = document.createElement("span")
    nbLikes.className = nbLikesClass
    nbLikes.textContent = media.price
    const likeIcon = document.createElement("i")
    likeIcon.className = likeIconClass
    likeIcon.textContent = "\u2665"
    likeIcon.tabIndex = 0
    const likeIconAriaLabel = document.createAttribute("aria-label")
    likeIconAriaLabel.value = "likes"
    likeIcon.setAttributeNode(likeIconAriaLabel)
    const likeDiv = document.createElement("div")
    likeDiv.className = likeDivClass
    likeDiv.appendChild(nbLikes)
    likeDiv.appendChild(likeIcon)

    const description = document.createElement("div")
    description.className = descriptionClass
    description.appendChild(h2)
    description.appendChild(likeDiv)

    const mediaCard = document.createElement("article")
    mediaCard.className = mediaCardClass
    mediaCard.appendChild(anchor)
    mediaCard.appendChild(description)

    return mediaCard
  }

  getUserWorksDOM() {
    const cardArray = []
    for (let media of this.medias) cardArray.push(this.getUserWorkCard(media))

    return cardArray
  }
}
