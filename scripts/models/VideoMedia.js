export class VideoMedia {
  constructor(media, basedir) {
    this.media = media
    this.basedir = basedir
  }

  get mediaElement() {
    const media = document.createElement("video")
    media.src = `${this.basedir}/${this.media.video}`
    media.tabIndex = 0
    media.style.zIndex =
      -1 /* Chrome : to avoid selecting and open video media when sorting with mouse */

    return media
  }

  get lightBoxMedia() {
    const media = document.createElement("video")
    media.src = `${this.basedir}/${this.media.video}`

    const controls = document.createAttribute("controls")
    media.setAttributeNode(controls)
    media.tabIndex = 0

    return media
  }
}
