import { FetchData } from "../Api/FetchData.js"
import { PhotographerFactory } from "../factories/PhotographerFactory.js"
import { PhotographerPage } from "../models/PhotographerPage.js"
import { Sorting } from "../utils/Sorting.js"

const url = "/data/photographers.json"
const photographers = await new FetchData(url, "photographers").getData()
const works = await new FetchData(url, "media").getData()

const pageUrl = new URL(document.location).searchParams
const photographerId = parseInt(pageUrl.get("id"), 10)

// get photographer works
const mediasArray = works
  .filter((media) => Object.values(media).includes(photographerId))
  .sort((a, b) => (a.likes < b.likes ? 1 : -1))

const photographer = photographers.filter((element) =>
  Object.values(element).includes(photographerId)
)[0]

const photographerPage = new PhotographerFactory(photographer, mediasArray)

const parent = document.querySelector(".photographer-header")
const { description, image, insert } = photographerPage.getUserCardDOM()
parent.prepend(description)
parent.append(image, insert)

const photographerPageDisplay = (photographerWorks) => {
  const workDisplay = document.querySelector(".works_display")
  const cardArray = photographerWorks.getUserWorksDOM()
  cardArray.forEach((card) => workDisplay.append(card))
}

const waitForSortingMedias = () => {
  const optionElement = document.querySelector(".sorting__option--no-border")
  function sortMedia(option) {
    console.log(option.id)
    switch (option.id) {
      case "10":
        mediasArray.sort((a, b) => (a.likes < b.likes ? 1 : -1))
        break

      case "11":
        mediasArray.sort((a, b) => (a.date < b.date ? 1 : -1))
        break

      case "12":
        mediasArray.sort((a, b) => (a.title > b.title ? 1 : -1))
        break

      default:
        break
    }

    photographerPage.medias = mediasArray
    photographerPage.lightBox.mediaArray = mediasArray
    PhotographerPage.removeUserWorkCards(".works_display")
    photographerPageDisplay(photographerPage)
  }

  optionElement.addEventListener("click", () => {
    sortMedia(optionElement)
  })
  const sortingElement = document.getElementById("categories")
  const sortingObject = new Sorting(sortingElement)
  Sorting.initElements(sortingObject)
}

photographerPageDisplay(photographerPage)
photographerPage.setModal()
waitForSortingMedias(photographerPage)
