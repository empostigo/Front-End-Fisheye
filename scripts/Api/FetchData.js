export class FetchData {
  constructor(url, data, maxAge = "1800") {
    this.url = url
    this.data = data
    this.maxAge = maxAge
    this.header = new Headers()
    this.header.append("Cache-Control", this.maxAge)
  }

  async get() {
    return fetch(this.url, { headers: this.header })
      .then((response) => response.json())
      .then((response) => {
        if (this.data === "photographers") {
          return response.photographers
        } else if (this.data === "media") {
          return response.media
        }
      })
      .catch((err) => console.log("Erreur lors de la lecture des données", err))
  }

  async getData() {
    return await this.get()
  }
}
