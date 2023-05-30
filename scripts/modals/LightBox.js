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
    displayDiv.className = "lighbox__div"
    displayDiv.append(media)

    return displayDiv
  }

  newMediaDOM() {
    const media = new MediaFactory(
      this.mediaArray[this.mediaIndex],
      `/assets/works/${this.photographer.name}`
    ).lightBoxMedia
    media.className = "lightbox__media"
    this.previousMedia.insertAdjacentElement(
      "afterend",
      this.createMediaDOM(media)
    )
  }

  removeMediaDOM() {
    document
      .getElementById("lightBoxContainer")
      .removeChild(this.previousMedia.nextSibling)
  }

  openLightBox() {
    document.getElementById("main").style.display = "none"
    document.getElementById("header").style.display = "none"
    this.newMediaDOM(this.mediaIndex)
    this.lightBox.style.display = "initial"
  }

  closeLightBox() {
    document.getElementById("main").style.display = "block"
    document.getElementById("header").style.display = "flex"
    this.lightBox.style.display = "none"
    this.previousMedia.nextSibling.remove()
  }

  static initElements(lightBox) {
    lightBox.closeLightBoxButton.addEventListener("click", () => {
      lightBox.closeLightBox()
    })

    lightBox.nextMedia.addEventListener("click", () => {
      lightBox.removeMediaDOM()
      lightBox.mediaIndex++
      lightBox.newMediaDOM()
    })

    lightBox.previousMedia.addEventListener("click", () => {
      lightBox.removeMediaDOM()
      lightBox.mediaIndex--
      lightBox.newMediaDOM()
    })
  }
}
