
import axios from 'axios'
import { getItem } from '@/helpers'

export const BASE_API_URL = 'https://conduit.productionready.io/api' || ''

axios.interceptors.request.use((config) => {
  const token = getItem('accessToken')
  const authorizationToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authorizationToken
  return config
})

export default {
  register (credentials) {
    return axios.post(`${BASE_API_URL}/users`, { user: credentials })
  },
  login (credentials) {
    return axios.post(`${BASE_API_URL}/users/login`, { user: credentials })
  },
  getCurrentUser () {
    return axios.get(`${BASE_API_URL}/user`)
  }
}
