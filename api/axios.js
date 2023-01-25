import axios from 'axios'
import { getItem } from '@/helpers'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

axios.interceptors.request.use((config) => {
  const token = getItem('accessToken')
  const authorizationToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authorizationToken
  return config
})

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  console.log('error.response.status', error.response.status)
  if (error.response.status === 404) {
    window.location = '/no-access'
  } else if ((err?.toJSON()).message === 'Network Error') {
    window.location = '/unexpected-error'
  } else {
    return Promise.reject(error)
  }
})
export default axios
