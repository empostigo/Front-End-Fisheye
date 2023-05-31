import { BasePage } from "./BasePage.js"
import { MediaFactory } from "../factories/MediaFactory.js"
import { ContactForm } from "../modals/ContactForm.js"
import { LightBox } from "../modals/LightBox.js"

export class PhotographerPage extends BasePage {
  constructor(photographer, medias) {
    super(photographer)
    this.medias = medias
    this.contactForm = new ContactForm(
      "contactModal",
      "openModal",
      "closeModal",
      this.name
    )
    this.lightBox = new LightBox(this.medias, photographer)
  }

  set medias(mediasArray) {
    this._medias = mediasArray
  }

  get medias() {
    return this._medias
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
    const heartClass = `${parentClass}__heart`
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
    infos.append(location)
    infos.append(pTagLine)

    const description = document.createElement("div")
    description.className = descriptionClass
    description.append(h1)
    description.append(infos)

    // displaying portrait
    const image = document.createElement("img")
    image.className = imageClass
    image.setAttribute("src", this.picture)
    image.tabIndex = 0

    const likes = document.createElement("span")
    likes.className = likesClass
    likes.textContent = `${this.countLikes()} `

    const heart = document.createElement("img")
    heart.className = heartClass
    heart.src = "/assets/icons/black-heart.svg"
    heart.height = "18"

    likes.append(heart)

    const dayPrice = document.createElement("span")
    dayPrice.className = dayPriceClass
    dayPrice.textContent = this.cost

    const insert = document.createElement("div")
    insert.className = insertClass
    insert.tabIndex = 0
    insert.append(likes, dayPrice)

    return { description, image, insert }
  }

  getUserWorkCard(data, index) {
    // class names
    const mediaCardClass = "mediaCard"
    const mediaClass = `${mediaCardClass}__media`
    const anchorClass = `${mediaCardClass}__anchor`
    const h2Class = `${mediaCardClass}__title`
    const nbLikesClass = `${mediaCardClass}__nbLikes`
    const likeIconClass = `${mediaCardClass}__likeIcon`
    const likeDivClass = `${mediaCardClass}__likeDiv`
    const descriptionClass = `${mediaCardClass}__description`

    // card component
    const basedir = `/assets/works/${this.name}`
    const media = new MediaFactory(data, basedir).mediaElement
    media.className = mediaClass
    media.id = index
    media.addEventListener("click", () => {
      this.lightBox.mediaIndex = parseInt(media.id)
      this.lightBox.openLightBox()
    })
    const anchor = document.createElement("a")
    anchor.className = anchorClass
    anchor.href = "#"
    const anchorAriaLabel = document.createAttribute("aria-label")
    anchorAriaLabel.value = `${data.title}, closeup view`
    anchor.tabIndex = 0
    anchor.setAttributeNode(anchorAriaLabel)
    anchor.append(media)

    const h2 = document.createElement("h2")
    h2.className = h2Class
    h2.textContent = data.title
    h2.tabIndex = 0

    const nbLikes = document.createElement("span")
    nbLikes.className = nbLikesClass
    nbLikes.textContent = data.likes
    const likeIcon = document.createElement("img")
    likeIcon.className = likeIconClass
    likeIcon.src = "/assets/icons/red-heart.svg"
    likeIcon.height = "22"
    likeIcon.tabIndex = 0
    const likeIconAriaLabel = document.createAttribute("aria-label")
    likeIconAriaLabel.value = "likes"
    likeIcon.setAttributeNode(likeIconAriaLabel)
    const likeDiv = document.createElement("div")
    likeDiv.className = likeDivClass
    likeDiv.append(nbLikes)
    likeDiv.append(likeIcon)

    const description = document.createElement("div")
    description.className = descriptionClass
    description.append(h2)
    description.append(likeDiv)

    const mediaCard = document.createElement("article")
    mediaCard.className = mediaCardClass
    mediaCard.append(anchor)
    mediaCard.append(description)

    return mediaCard
  }

  getUserWorksDOM() {
    let index = 0
    const cardArray = []
    for (let media of this.medias)
      cardArray.push(this.getUserWorkCard(media, index++))

    return cardArray
  }

  removeUserWorkCards(selector) {
    const workDisplay = document.querySelector(selector)
    const workDisplayCards = Array.from(workDisplay.children)
    workDisplayCards.forEach((element) => {
      workDisplay.removeChild(element)
    })
  }

  setModal() {
    ContactForm.initElements(this.contactForm)
  }

  setLightBox() {
    LightBox.initElements(this.lightBox)
  }
}
