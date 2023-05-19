import { HomePage } from "../models/HomePage.js"
import { PhotographerPage } from "../models/PhotographerPage.js"

export class PhotographerFactory {
  constructor(data, type) {
    // HomePage (index.js) photographers type
    if (type === "home") return new HomePage(data)
    // PhotographerPage (photographer.js) photographer type
    else if (type === "works") return new PhotographerPage(data)
    // Unknown type
    else throw "Type inconnu"
  }
}
