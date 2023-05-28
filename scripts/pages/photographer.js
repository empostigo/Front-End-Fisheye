import { FetchData } from "../Api/FetchData.js"
import { PhotographerFactory } from "../factories/PhotographerFactory.js"

const url = "/data/photographers.json"
const photographers = await new FetchData(url, "photographers").getData()
const works = await new FetchData(url, "media").getData()

const pageUrl = new URL(document.location).searchParams
const photographerId = parseInt(pageUrl.get("id"))

// get photographer works
const mediasArray = []
for (let media of works)
  if (Object.values(media).includes(photographerId)) mediasArray.push(media)
// sort medias by popularity, descending order
mediasArray.sort((a, b) => {
  return a.likes < b.likes
})

const photographer = photographers.filter((element) =>
  Object.values(element).includes(photographerId)
)[0]

const photographerPage = new PhotographerFactory(photographer, mediasArray)

const parent = document.querySelector(".photographer-header")
const { description, image, insert } = photographerPage.getUserCardDOM()
parent.prepend(description)
parent.append(image, insert)

const photographerPageDisplay = (photographerPage) => {
  const workDisplay = document.querySelector(".works_display")
  const cardArray = photographerPage.getUserWorksDOM()
  for (let card of cardArray) workDisplay.append(card)
}

const waitForSortingMedias = (photographerPage) => {
  const selectElement = document.getElementById("categories")
  selectElement.addEventListener("change", function () {
    switch (this.value) {
      case "popularité":
        mediasArray.sort((a, b) => {
          return a.likes < b.likes
        })
        break

      case "date":
        mediasArray.sort((a, b) => {
          return a.date < b.date
        })
        break

      case "titre":
        mediasArray.sort((a, b) => {
          return a.title > b.title
        })
        break
    }

    photographerPage.medias = mediasArray
    photographerPage.removeUserWorkCards(".works_display")
    photographerPageDisplay(photographerPage)
  })
}

photographerPageDisplay(photographerPage)
photographerPage.setModal()

waitForSortingMedias(photographerPage)
