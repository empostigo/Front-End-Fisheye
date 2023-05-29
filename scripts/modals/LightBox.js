import { MediaFactory } from "../factories/MediaFactory.js"

export class LightBox {
  constructor(mediaArray, photographer) {
    this.mediaArray = mediaArray
    this.photographer = photographer
    this.lightBox = document.getElementById("lightBox")
    this.previousMedia = document.getElementById("previousMedia")
    this.nextMedia = document.getElementById("nextMedia")
    this.closeLightBoxButton = document.getElementById("closeLightBox")
    this.mediaIndex = 0
    this.media = new MediaFactory(
      this.mediaArray[this.mediaIndex],
      `/assets/works/${this.photographer.name}`
    ).lightBoxMedia
    this.media.className = "lightbox__media"
  }

  set mediaArray(medias) {
    this._mediaArray = medias
  }

  get mediaArray() {
    return this._mediaArray
  }

  createMediaDOM() {
    const displayDiv = document.createElement("div")
    displayDiv.className = "lighbox__div"
    displayDiv.append(this.media)

    return displayDiv
  }

  openLightBox() {
    document.getElementById("main").style.display = "none"
    document.getElementById("header").style.display = "none"
    this.lightBox.style.display = "initial"

    this.previousMedia.insertAdjacentElement("afterend", this.createMediaDOM())
  }

  closeLightBox() {
    document.getElementById("main").style.display = "block"
    document.getElementById("header").style.display = "flex"
    this.lightBox.style.display = "none"
  }

  static initElements(lightBox) {
    lightBox.closeLightBoxButton.addEventListener("click", () => {
      lightBox.closeLightBox()
    })

    lightBox.nextMedia.addEventListener("click", () => {
      lightBox.mediaIndex++
      lightBox.media = new MediaFactory(
        lightBox.mediaArray[lightBox.mediaIndex],
        `/assets/works/${lightBox.photographer.name}`
      ).lightBoxMedia
      lightBox.media.className = "lightbox__media"
      document
        .getElementById("lightBoxContainer")
        .removeChild(lightBox.previousMedia.nextSibling)
      lightBox.previousMedia.insertAdjacentElement(
        "afterend",
        lightBox.createMediaDOM(lightBox.photographer)
      )
    })
  }
}
