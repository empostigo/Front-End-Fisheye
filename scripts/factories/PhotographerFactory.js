import HomePage from "../models/HomePage.js"
import PhotographerPage from "../models/PhotographerPage.js"

export default class PhotographerFactory {
  constructor(data, otherData = "") {
    this.pathname = new URL(document.location).pathname.replace("/", "")
    // HomePage (index.js) photographers type
    if (!this.pathname || this.pathname === "index.html")
      return new HomePage(data)
    // PhotographerPage (photographer.js) photographer type
    if (this.pathname === "photographer.html")
      return new PhotographerPage(data, otherData) // PhotographerPage needs the media part of photographers.json
    // Unknown Page
    throw new Error("Page inconnu")
  }
}
