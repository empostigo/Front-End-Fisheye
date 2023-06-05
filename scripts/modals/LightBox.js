import { MediaFactory } from "../factories/MediaFactory.js"

export class LightBox {
  constructor(mediaArray, photographer) {
    this.mediaArray = mediaArray
    this.photographer = photographer
    this.lightBox = document.getElementById("lightBox")
    this.previousMedia = document.getElementById("previousMedia")
    this.nextMedia = document.getElementById("nextMedia")
    this.closeLightBoxButton = document.getElementById("closeLightBox")
  }

  set mediaArray(medias) {
    this._mediaArray = medias
  }

  get mediaArray() {
    return this._mediaArray
  }

  set mediaIndex(mediaIndex) {
    if (mediaIndex === this.mediaArray.length) this._mediaIndex = 0
    else if (mediaIndex < 0) this._mediaIndex = this.mediaArray.length - 1
    else this._mediaIndex = mediaIndex
  }

  get mediaIndex() {
    return this._mediaIndex
  }

  createMediaDOM(media) {
    const displayDiv = document.createElement("div")
    displayDiv.className = "lightbox__div"

    const mediaTitle = document.createElement("p")
    mediaTitle.className = "lightbox__title"
    mediaTitle.textContent = this.mediaArray[this.mediaIndex].title
    mediaTitle.tabIndex = 0

    displayDiv.append(media, mediaTitle)

    return displayDiv
  }

  newMediaDOM() {
    const mediaInfos = this.mediaArray[this.mediaIndex]
    const media = new MediaFactory(
      mediaInfos,
      `/assets/works/${this.photographer.name}`
    ).lightBoxMedia
    media.className = "lightbox__media"
    media.tabIndex = 0

    const mediaAriaLabel = document.createAttribute("aria-label")
    mediaAriaLabel.textContent = mediaInfos.title
    media.setAttributeNode(mediaAriaLabel)

    this.previousMedia.insertAdjacentElement(
      "afterend",
      this.createMediaDOM(media)
    )
  }

  static removeMediaDOM() {
    const divToRemove = document.querySelector(".lightbox__div")
    if (divToRemove) divToRemove.remove()
  }

  displayPreviousMedia() {
    LightBox.removeMediaDOM()
    this.mediaIndex--
    this.newMediaDOM()
  }

  displayNextMedia() {
    LightBox.removeMediaDOM()
    this.mediaIndex++
    this.newMediaDOM()
  }

  openLightBox() {
    document.getElementById("main").style.display = "none"
    document.getElementById("header").style.display = "none"
    this.newMediaDOM()

    this.lightBox.style.display = "initial"

    LightBox.initElements(this)
  }

  closeLightBox() {
    document.getElementById("main").style.display = "block"
    document.getElementById("header").style.display = "flex"
    LightBox.removeMediaDOM()

    document.getElementById(this.mediaIndex.toString()).focus()

    this.lightBox.style.display = "none"
  }

  static initElements(lightBox) {
    const waitingForArrowkey = (event) => {
      if (event.key === "ArrowLeft") lightBox.displayPreviousMedia()
      if (event.key === "ArrowRight") lightBox.displayNextMedia()
    }

    document.addEventListener("keydown", waitingForArrowkey)

    lightBox.nextMedia.addEventListener("click", () => {
      lightBox.displayNextMedia()
    })

    lightBox.previousMedia.addEventListener("click", () => {
      lightBox.displayPreviousMedia()
    })

    lightBox.closeLightBoxButton.addEventListener("click", () => {
      lightBox.closeLightBox()
      document.removeEventListener("keydown", waitingForArrowkey)
    })

    lightBox.closeLightBoxButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        lightBox.closeLightBox()
        document.removeEventListener("keydown", waitingForArrowkey)
      }
    })

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        lightBox.closeLightBox()
        document.removeEventListener("keydown", waitingForArrowkey)
      }
    })
  }
}
