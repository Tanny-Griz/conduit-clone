import axios from '@/api/axios'

export default {
  getUserProfile (slug) {
    return axios.get(`/profiles/${slug}`)
      .then(response => response.data.profile)
  }
}
