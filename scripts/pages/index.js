import { FetchData } from "../Api/FetchData.js"
import { PhotographerFactory } from "../factories/PhotographerFactory.js"

const url = "/data/photographers.json"
const photographers = await new FetchData(url, "photographers").getData()

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographers")

  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerFactory(photographer, "home")
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

function init() {
  // Récupère les datas des photographes
  displayData(photographers)
}

init()
