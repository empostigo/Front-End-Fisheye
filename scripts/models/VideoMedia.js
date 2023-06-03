export class VideoMedia {
  constructor(media, basedir) {
    this.media = media
    this.basedir = basedir
  }

  get mediaElement() {
    const media = document.createElement("video")
    media.src = `${this.basedir}/${this.media.video}`
    media.tabIndex = -1

    return media
  }

  get lightBoxMedia() {
    const media = document.createElement("video")
    media.src = `${this.basedir}/${this.media.video}`

    const controls = document.createAttribute("controls")
    media.setAttributeNode(controls)
    media.tabIndex = -1

    return media
  }
}
