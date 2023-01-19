import axios from '@/api/axios'

export default {
  getRealWorldTags (apiUrl) {
    return axios.get(apiUrl)
  }
}
