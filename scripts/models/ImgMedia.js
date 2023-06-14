export class ImgMedia {
  constructor(media, basedir) {
    this.media = media
    this.basedir = basedir
  }

  // Media used in the photographer page
  get mediaElement() {
    const media = document.createElement("img")
    media.src = `${this.basedir}/${this.media.image}`
    media.alt = this.media.title
    media.tabIndex = 0

    return media
  }

  // Media used in the lightbox
  get lightBoxMedia() {
    return this.mediaElement
  }
}
