import { ImgMedia } from "../models/ImgMedia.js"
import { VideoMedia } from "../models/VideoMedia.js"

export class MediaFactory {
  constructor(media, basedir) {
    if (Object.keys(media).includes("image")) {
      return new ImgMedia(media, basedir)
    }
    if (Object.keys(media).includes("video")) {
      return new VideoMedia(media, basedir)
    }
  }
}
