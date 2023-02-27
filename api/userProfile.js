import axios from '@/api/axios'

const getUrl = slug => `/profiles/${slug}/follow`

export default {
  getUser (slug) {
    return axios.get(`/profiles/${slug}`)
      .then(response => response.data.profile)
  },
  follow (slug) {
    const url = getUrl(slug)
    return axios.post(url).then(response => response.data.profile)
  },
  unFollow (slug) {
    const url = getUrl(slug)
    return axios.delete(url).then(response => response.data.profile)
  }
}
