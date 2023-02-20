import axios from '@/api/axios'

const getUrl = slug => `/articles/${slug}/favorite`

export default {
  addToFavorites (slug) {
    console.log('addToFavorites1')
    const url = getUrl(slug)
    return axios.post(url).then(response => response.data.article)
  },
  removeFromFavorites (slug) {
    console.log('removeFromFavorites2')
    const url = getUrl(slug)
    return axios.delete(url).then(response => response.data.article)
  }
}
