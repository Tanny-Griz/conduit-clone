const REALWORLD_ARTICLES_API_URL = 'https://api.realworld.io/api'

export class RealWorld {
  constructor ($axios) {
    this.$axios = $axios
  }

  async getRealWorldArticles (limit, offset) {
    console.log('here')
    const RES = await this.$axios.$get(`${REALWORLD_ARTICLES_API_URL}/articles?limit=${limit}&offset=${offset}`)
    return RES
  }

  async getRealWorldTags () {
    const RES = await this.$axios.$get(`${REALWORLD_ARTICLES_API_URL}/tags`)
    return RES
  }
}

export default ({ $axios }, inject) => {
  inject('realworld', new RealWorld($axios))
}
