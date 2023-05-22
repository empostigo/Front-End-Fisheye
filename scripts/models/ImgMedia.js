export class ImgMedia {
  constructor(media, basedir) {
    this.media = media
    this.basedir = basedir
  }

  get mediaElement() {
    const media = document.createElement("img")
    media.src = `${this.basedir}/${this.media.image}`

    return media
  }
}
