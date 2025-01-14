import BasePage from "./BasePage.js"
import MediaFactory from "../factories/MediaFactory.js"
import ContactForm from "../modals/ContactForm.js"
import LightBox from "../modals/LightBox.js"

export default class PhotographerPage extends BasePage {
  constructor(photographer, mediasArray) {
    super(photographer)
    this.mediasArray = mediasArray
    this.totalLikes = this.mediasArray
      .map(({ likes }) => ({ likes }))
      .reduce((total, current) => total + current.likes, 0)
    this.contactForm = new ContactForm(this.name)
    this.lightBox = new LightBox(this.mediasArray, photographer.name)
  }

  // Photographer header
  getPhotographerHeader = () => {
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
    const likesWrapperClass = `${parentClass}__likes-wrapper`
    const dayPriceClass = `${parentClass}__day-price`
    const insertClass = `${parentClass}__insert`

    // Name, city, country and tagline
    const h1 = document.createElement("h1")
    h1.className = h1Class
    h1.textContent = this.name
    h1.tabIndex = 0

    const location = document.createElement("h2")
    location.className = locationClass
    location.textContent = this.place

    const pTagLine = document.createElement("p")
    pTagLine.className = pTagLineClass
    pTagLine.textContent = this.tagline

    const infos = document.createElement("div")
    infos.className = infosClass
    infos.tabIndex = 0
    infos.append(location, pTagLine)

    const description = document.createElement("div")
    description.className = descriptionClass
    description.append(h1, infos)

    // displaying portrait
    const image = document.createElement("img")
    image.className = imageClass
    image.src = this.picture
    image.alt = this.name
    const imageAriaLabel = document.createAttribute("aria-label")
    imageAriaLabel.textContent = this.name
    image.setAttributeNode(imageAriaLabel)
    image.tabIndex = 0

    const likes = document.createElement("span")
    likes.className = likesClass
    likes.textContent = `${this.totalLikes} `

    const heart = document.createElement("img")
    heart.className = heartClass
    heart.src = "/assets/icons/black-heart.svg"
    heart.alt = "Number of likes"
    heart.height = "20"

    const likesWrapper = document.createElement("div")
    likesWrapper.className = likesWrapperClass
    likesWrapper.append(likes, heart)

    const dayPrice = document.createElement("span")
    dayPrice.className = dayPriceClass
    dayPrice.textContent = this.cost

    const insert = document.createElement("div")
    insert.className = insertClass
    insert.tabIndex = 0
    insert.append(likesWrapper, dayPrice)

    return { description, image, insert }
  }

  getPhotographerWorkCard = (data, index) => {
    // class names
    const mediaCardClass = "mediaCard"
    const mediaClass = `${mediaCardClass}__media`
    const h2Class = `${mediaCardClass}__title`
    const nbLikesClass = `${mediaCardClass}__nbLikes`
    const likeIconClass = `${mediaCardClass}__likeIcon`
    const likeDivClass = `${mediaCardClass}__likeDiv`
    const descriptionClass = `${mediaCardClass}__description`

    // card component
    const basedir = `/assets/works/${this.name}`
    const media = new MediaFactory(data, basedir).mediaElement
    media.id = index
    media.className = mediaClass
    const mediaAriaLabel = document.createAttribute("aria-label")
    mediaAriaLabel.value = `${data.title}, agrandir l'image`
    media.setAttributeNode(mediaAriaLabel)
    media.addEventListener("click", () => {
      this.lightBox.mediaIndex = parseInt(media.id, 10)
      this.lightBox.openLightBox()
    })
    media.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.lightBox.mediaIndex = parseInt(media.id, 10)
        this.lightBox.openLightBox()
      }
    })

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
    likeIcon.alt = "likes"
    likeIcon.height = "22"
    likeIcon.tabIndex = 0
    const likeIconAriaLabel = document.createAttribute("aria-label")
    likeIconAriaLabel.value = "likes"
    likeIcon.setAttributeNode(likeIconAriaLabel)

    let flag = 0
    const mediaNbLikes = document.querySelector(".photographer-header__likes")
    const computeLikes = () => {
      if (flag++ % 2 === 0) {
        nbLikes.textContent++
        mediaNbLikes.textContent = `${++this.totalLikes}`
      } else {
        nbLikes.textContent--
        mediaNbLikes.textContent = `${--this.totalLikes}`
      }
    }

    likeIcon.addEventListener("click", () => {
      computeLikes()
    })

    likeIcon.addEventListener("keydown", (event) => {
      if (event.key === "Enter") computeLikes()
    })

    const likeDiv = document.createElement("div")
    likeDiv.className = likeDivClass
    likeDiv.append(nbLikes, likeIcon)

    const description = document.createElement("div")
    description.className = descriptionClass
    description.append(h2)
    description.append(likeDiv)

    const mediaCard = document.createElement("article")
    mediaCard.className = mediaCardClass
    mediaCard.append(media, description)

    return mediaCard
  }

  static removeUserWorkCards = (selector) => {
    const workDisplay = document.querySelector(selector)
    const workDisplayCards = Array.from(workDisplay.children)
    workDisplayCards.forEach((element) => {
      workDisplay.removeChild(element)
    })
  }

  setModal = () => {
    ContactForm.initElements(this.contactForm)
  }
}
