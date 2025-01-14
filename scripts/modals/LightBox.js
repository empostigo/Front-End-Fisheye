import MediaFactory from "../factories/MediaFactory.js"

export default class LightBox {
  constructor(mediasArray, photographerName) {
    this.mediasArray = mediasArray
    this.photographerName = photographerName // Also basedir to photographer medias
    this.lightBox = document.getElementById("lightBox")
    this.previousMedia = document.getElementById("previousMedia")
    this.nextMedia = document.getElementById("nextMedia")
    this.closeLightBoxButton = document.getElementById("closeLightBox")
  }

  // Is set when creating media card, in PhotographerPage.js (which has a LightBox object),
  // line 139 to position the lightbox on the media opened, using its numeric id.
  // Set index to avoid get out of the array of medias, when scrolling medias
  set mediaIndex(mediaIndex) {
    // From end to beginning of array
    if (mediaIndex === this.mediasArray.length) this._mediaIndex = 0
    // From beginning to end of array
    else if (mediaIndex < 0) this._mediaIndex = this.mediasArray.length - 1
    else this._mediaIndex = mediaIndex
  }

  get mediaIndex() {
    return this._mediaIndex
  }

  // Create card with media from newMediaDOM() below
  createMediaDOM = (media) => {
    const displayDiv = document.createElement("div")
    displayDiv.className = "lightbox__div"

    const mediaTitle = document.createElement("p")
    mediaTitle.className = "lightbox__title"
    mediaTitle.textContent = this.mediasArray[this.mediaIndex].title
    mediaTitle.tabIndex = 0

    displayDiv.append(media, mediaTitle)

    return displayDiv
  }

  // Create img of video tag with classes and attributes
  // this.mediaIndex is set by PhotographerPage.js, see line 13 above
  newMediaDOM = () => {
    const mediaInfos = this.mediasArray[this.mediaIndex]
    const media = new MediaFactory(
      mediaInfos,
      `/assets/works/${this.photographerName}`
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

  // eslint: "this" is not used, so it's stated that this method should be static
  static removeMediaDOM = () => {
    const divToRemove = document.querySelector(".lightbox__div")
    if (divToRemove) divToRemove.remove()
  }

  displayPreviousMedia = () => {
    LightBox.removeMediaDOM()
    this.mediaIndex--
    this.newMediaDOM()
  }

  displayNextMedia = () => {
    LightBox.removeMediaDOM()
    this.mediaIndex++
    this.newMediaDOM()
  }

  // This method method is used in PhotographerPage.js, line 116
  // An eventListener is attach to all media cards of the page
  // To open the lightbox when pressing Enter or clicking
  openLightBox = () => {
    document.getElementById("main").style.display = "none"
    document.getElementById("header").style.display = "none"
    this.newMediaDOM()

    this.lightBox.style.display = "initial"

    LightBox.initElements(this)
  }

  closeLightBox = () => {
    document.getElementById("main").style.display = "block"
    document.getElementById("header").style.display = "flex"
    LightBox.removeMediaDOM()

    document.getElementById(this.mediaIndex.toString()).focus()

    this.lightBox.style.display = "none"
  }

  static initElements = (lightBox) => {
    // Scrolling medias
    const waitingForArrowkey = (event) => {
      if (event.key === "ArrowLeft") lightBox.displayPreviousMedia()
      if (event.key === "ArrowRight") lightBox.displayNextMedia()
    }

    document.addEventListener("keydown", waitingForArrowkey)

    // Arrow keys navigation
    lightBox.nextMedia.addEventListener("click", () => {
      lightBox.displayNextMedia()
    })

    lightBox.previousMedia.addEventListener("click", () => {
      lightBox.displayPreviousMedia()
    })

    lightBox.nextMedia.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        lightBox.displayNextMedia()
      }
    })

    lightBox.previousMedia.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        lightBox.displayPreviousMedia()
      }
    })

    // Closing lightbox evnts: Clicking, pressing Enter or Escape
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
