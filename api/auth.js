
import axios from 'axios'
import { getItem } from '@/helpers'

axios.interceptors.request.use((config) => {
  const token = getItem('accessToken')
  const authorizationToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authorizationToken
  return config
})

export default {
  register (credentials) {
    return axios.post('/users', { user: credentials })
  },
  login (credentials) {
    return axios.post('/users/login', { user: credentials })
  },
  getCurrentUser () {
    return axios.get('/user')
  }
}
