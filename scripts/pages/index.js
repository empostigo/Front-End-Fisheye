async function getPhotographers() {
  const url = "/data/photographers.json"

  return fetch(url)
    .then((response) => response.json())
    .then((response) => response.photographers)
    .catch(console.log("Erreur lors de la lecture des données"))
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section")

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
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
