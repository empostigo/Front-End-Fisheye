import { FetchData } from "../Api/FetchData.js"
import { PhotographerFactory } from "../factories/PhotographerFactory.js"
import { PhotographerPage } from "../models/PhotographerPage.js"
import { Sorting } from "../utils/Sorting.js"

const url = "/data/photographers.json"
const photographers = await new FetchData(url, "photographers").getData()
const works = await new FetchData(url, "media").getData()

const photographerId = parseInt(
  new URL(document.location).searchParams.get("id"),
  10
)

// get photographer works
const mediasArray = works
  .filter((media) => Object.values(media).includes(photographerId))
  .sort((a, b) => (a.likes < b.likes ? 1 : -1))

// Use photographerId to get photographer data
const photographer = photographers
  .filter((element) => Object.values(element).includes(photographerId))
  .shift()

// Create PhotographerPage object
const photographerPage = new PhotographerFactory(photographer, mediasArray)

// Create and add photographer header with getUserCardDOM()
const parent = document.querySelector(".photographer-header")
const { description, image, insert } = photographerPage.getPhotographerHeader()
parent.prepend(description)
parent.append(image, insert)

// Create photographer works cards with getUserWorksDOM()
// and add them to div.works-display
const photographerPageDisplay = (photographerWorks) => {
  const workDisplay = document.querySelector(".works_display")
  const cardArray = photographerWorks.getUserWorksDOM()
  cardArray.forEach((card) => workDisplay.append(card))
}

// Sorting function
const sortingElement = document.getElementById("categories")
const waitForSortingMedias = () => {
  // Use a MutationObserver to track changes of data-index-number attributes of the listbox ul#categories
  // Define observer:
  const observer = new MutationObserver((options) => {
    options.forEach((mutation) => {
      if (mutation.type === "attributes") {
        switch (sortingElement.dataset.indexNumber) {
          case "10": // Sorting by popularity
            mediasArray.sort((a, b) => (a.likes < b.likes ? 1 : -1))
            break

          case "11": // Sorting by date
            mediasArray.sort((a, b) => (a.date < b.date ? 1 : -1))
            break

          case "12": // Sorting by title
            mediasArray.sort((a, b) => (a.title > b.title ? 1 : -1))
            break

          default:
            break
        }

        // Set lightbox mediasArray to reflect sorting
        photographerPage.lightBox.mediasArray = mediasArray

        // Remove all photographer works and display new medias order
        PhotographerPage.removeUserWorkCards(".works_display")
        photographerPageDisplay(photographerPage)
      }
    })
  })

  // Use observer
  observer.observe(sortingElement, { attributes: true })

  // Style and display sorting option
  const sortingObject = new Sorting(sortingElement) // sortingElement: ul#categories, defined line 43
  Sorting.initElements(sortingObject)
}

photographerPageDisplay(photographerPage) // Initial display of photographer works
photographerPage.setModal() // Contact form
waitForSortingMedias(photographerPage)
