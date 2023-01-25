
import axios from 'axios'

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
