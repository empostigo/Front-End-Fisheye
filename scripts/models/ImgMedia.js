export class ImgMedia {
  constructor(media, basedir) {
    this.media = media
    this.basedir = basedir
  }

  get mediaElement() {
    const media = document.createElement("img")
    media.src = `${this.basedir}/${this.media.image}`
    media.alt = this.media.title

    return media
  }

  get lightBoxMedia() {
    return this.mediaElement
  }
}
