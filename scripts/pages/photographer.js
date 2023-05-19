import { FetchData } from "../Api/FetchData.js"
import { PhotographerFactory } from "../factories/PhotographerFactory.js"

const url = "/data/photographers.json"
const photographers = await new FetchData(url, "photographers").getData()
const works = await new FetchData(url, "media").getData()

const pageUrl = new URL(document.location).searchParams
const photographerId = parseInt(pageUrl.get("id"))

photographers.forEach((photographer) => {
  if (Object.values(photographer).includes(photographerId)) {
    const photographerHeader = new PhotographerFactory(photographer, "works")
    const parent = document.querySelector(".photographer-header")
    const sibbling = document.querySelector(".contact_button")
    const { description, image } = photographerHeader.getUserCardDOM()
    parent.insertBefore(description, sibbling)
    parent.appendChild(image)
  }
})
