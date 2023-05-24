import { FetchData } from "../Api/FetchData.js"
import { PhotographerFactory } from "../factories/PhotographerFactory.js"
import { ContactForm } from "../utils/ContactForm.js"

const url = "/data/photographers.json"
const photographers = await new FetchData(url, "photographers").getData()
const works = await new FetchData(url, "media").getData()

const pageUrl = new URL(document.location).searchParams
const photographerId = parseInt(pageUrl.get("id"))

for (let photographer of photographers)
  if (Object.values(photographer).includes(photographerId)) {
    // get photographer works
    const mediaArray = []
    for (let media of works)
      if (Object.values(media).includes(photographerId)) mediaArray.push(media)

    const photographerPage = new PhotographerFactory(
      photographer,
      "works",
      mediaArray
    )

    const parent = document.querySelector(".photographer-header")
    const { description, image, insert } = photographerPage.getUserCardDOM()
    parent.prepend(description)
    parent.append(image, insert)

    const workDisplay = document.querySelector(".works_display")
    const cardArray = photographerPage.getUserWorksDOM()
    for (let card of cardArray) workDisplay.appendChild(card)

    break
  }

const contactForm = new ContactForm("contactModal", "openModal", "closeModal")
ContactForm.initElements(contactForm)
