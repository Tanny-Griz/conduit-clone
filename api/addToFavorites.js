import axios from '@/api/axios'

const getUrl = slug => `/articles/${slug}/favorite`

export default {
  addToFavorites (slug) {
    const url = getUrl(slug)
    return axios.post(url).then(response => response.data.article)
  },
  removeFromFavorites (slug) {
    const url = getUrl(slug)
    return axios.delete(url).then(response => response.data.article)
  }
}
