import FetchData from "../Api/FetchData.js"
import PhotographerFactory from "../factories/PhotographerFactory.js"

const url = "/data/photographers.json"
const photographers = await new FetchData(url, "photographers").getData()

const photographersSection = document.querySelector(".photographers")

// Append all photographers cards
photographers.forEach((photographer) => {
  const photographerModel = new PhotographerFactory(photographer)
  const userCardDOM = photographerModel.getUserCardDOM()
  photographersSection.append(userCardDOM)
})
