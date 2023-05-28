export class VideoMedia {
  constructor(media, basedir) {
    this.media = media
    this.basedir = basedir
  }

  get mediaElement() {
    const media = document.createElement("video")
    media.src = `${this.basedir}/${this.media.video}`

    return media
  }
}
