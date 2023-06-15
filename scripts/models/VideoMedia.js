export default class VideoMedia {
  constructor(media, basedir) {
    this.media = media
    this.basedir = basedir
  }

  // Media used in the photographer page
  get mediaElement() {
    const media = document.createElement("video")
    media.src = `${this.basedir}/${this.media.video}`
    media.tabIndex = 0

    return media
  }

  // Media used in the lightbox
  // Add controls to videos
  get lightBoxMedia() {
    const media = document.createElement("video")
    media.src = `${this.basedir}/${this.media.video}`

    const controls = document.createAttribute("controls")
    media.setAttributeNode(controls)
    media.tabIndex = 0

    return media
  }
}
