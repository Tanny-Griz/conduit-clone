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
}, function (error) {
  console.log('kkk', error.response.status)
  if (error.response.status === 401) {
    // window.location.href = '/log-in'
  } else {
    return Promise.reject(error)
  }
})
export default axios
