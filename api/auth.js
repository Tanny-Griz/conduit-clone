
import axios from 'axios'

export const BASE_API_URL = 'https://conduit.productionready.io/api' || ''

export default {
  register (credentials) {
    return axios.post(`${BASE_API_URL}/users`, { user: credentials })
  }
}
