import axios from '@/api/axios'

export default {
  getRealWorldArticles (apiUrl) {
    return axios.get(apiUrl)
  }
}
