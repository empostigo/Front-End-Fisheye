export class FetchData {
  constructor(url, data) {
    this.url = url
    this.data = data
  }

  async get() {
    return fetch(this.url)
      .then((response) => response.json())
      .then((response) => {
        if (this.data === "photographers") {
          return response.photographers
        } else {
          return response.media
        }
      })
      .catch((err) => console.log("Erreur lors de la lecture des données", err))
  }

  async getData() {
    return await this.get()
  }
}
