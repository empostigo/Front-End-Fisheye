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

  createMediaDOM() {
    const displayDiv = document.createElement("div")
    displayDiv.className = "lighbox__div"
    const media = new MediaFactory(
      this.mediaArray[0],
      `/assets/works/${this.photographer.name}`
    ).lightBoxMedia
    media.className = "lightbox__media"
    displayDiv.append(media)

    return displayDiv
  }

  openLightBox() {
    document.getElementById("main").style.display = "none"
    document.getElementById("header").style.display = "none"
    this.lightBox.style.display = "initial"

    this.previousMedia.insertAdjacentElement(
      "afterend",
      this.createMediaDOM(this.photographer)
    )
  }

  closeLightBox() {
    document.getElementById("main").style.display = "block"
    document.getElementById("header").style.display = "flex"
    this.lightBox.style.display = "none"
  }

  initElements() {
    this.closeLightBoxButton.addEventListener("click", () => {
      this.closeLightBox()
    })

    //this.previousMedia.addEventListener("click", () =>)
  }
}
