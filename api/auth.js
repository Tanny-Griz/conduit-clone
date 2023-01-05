
import axios from 'axios'

export const BASE_API_URL = 'https://conduit.productionready.io/api/users' || ''

export default {
  register (credentials) {
    return axios.post(`${BASE_API_URL}`, { user: credentials })
  },
  login (credentials) {
    return axios.post(`${BASE_API_URL}/login`, { user: credentials })
  }
}
