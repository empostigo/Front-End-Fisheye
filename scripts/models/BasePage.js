class BasePage {
  constructor(photographer) {
    this.name = photographer.name
    this.id = photographer.id
    this.city = photographer.city
    this.country = photographer.country
    this.tagline = photographer.tagline
    this.price = photographer.price
    this.portrait = photographer.portrait
  }

  // photographer image url
  get picture() {
    return `assets/photographers/${this.portrait}`
  }
  // concatenate city and country
  get place() {
    return `${this.city}, ${this.country}`
  }
  // create cost string with price
  get cost() {
    return `${this.price}€/jour`
  }
}
