import { PhotographerFactory } from "../factories/PhotographerFactory.js"

async function getPhotographers() {
  const url = "/data/photographers.json"

  return fetch(url)
    .then((response) => response.json())
    .then((response) => response.photographers)
    .catch((err) => console.log("Erreur lors de la lecture des données", err))
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographers")

  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerFactory(photographer, "home")
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers()
  displayData(photographers)
}

init()
