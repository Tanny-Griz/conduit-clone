import authApi from '@/api/auth'
import { setItem } from '@/helpers/local-storage'

export const state = () => ({
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
})

export const getters = {
  currentUser: (state) => {
    return state.currentUser
  },
  isLoggedIn: (state) => {
    return Boolean(state.isLoggedIn)
  },
  isAnonymous: (state) => {
    return state.isLoggedIn === false
  }
}

export const mutations = {
  REGISTER_START (state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  REGISTER_SUCCESS (state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  REGISTER_FAILURE (state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  LOGIN_START (state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  LOGIN_SUCCESS (state, payload) {
    state.isSubmitting = false
    state.isLoggedIn = true
    state.currentUser = payload
  },
  LOGIN_FAILURE (state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

  GET_CURRENT_USER_START (state) {
    state.isLoading = true
  },
  GET_CURRENT_USER_SUCCESS (state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  GET_CURRENT_USER_FAILURE (state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  },

  UPDATE_CURRENT_USER_START () {},
  UPDATE_CURRENT_USER_SUCCESS (state, payload) {
    state.currentUser = payload
  },
  UPDATE_CURRENT_USER_FAILURE () {},

  LOGOUT (state) {
    state.currentUser = null
    state.isLoggedIn = false
  }
}

export const actions = {
  register (context, credentials) {
    return new Promise((resolve) => {
      context.commit('REGISTER_START')
      authApi.register(credentials)
        .then((response) => {
          context.commit('REGISTER_SUCCESS', response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((result) => {
          context.commit('REGISTER_FAILURE', result.response.data.errors)
        })
    })
  },
  login (context, credentials) {
    return new Promise((resolve) => {
      context.commit('LOGIN_START')
      authApi.login(credentials)
        .then((response) => {
          context.commit('LOGIN_SUCCESS', response.data.user)
          setItem('accessToken', response.data.user.token)
          resolve(response.data.user)
        })
        .catch((result) => {
          context.commit('LOGIN_FAILURE', result.response.data.errors)
        })
    })
  },
  getCurrentUser (context) {
    return new Promise((resolve) => {
      context.commit('GET_CURRENT_USER_START')
      authApi.getCurrentUser()
        .then((response) => {
          context.commit('GET_CURRENT_USER_SUCCESS', response.data.user)
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit('GET_CURRENT_USER_FAILURE')
        })
    })
  },
  updateCurrentUser (context, currentUserInput) {
    return new Promise((resolve) => {
      context.commit('UPDATE_CURRENT_USER_START')
      authApi.updateCurrentUser(currentUserInput)
        .then((user) => {
          context.commit('UPDATE_CURRENT_USER_SUCCESS', user)
          resolve(user)
        })
        .catch((result) => {
          context.commit(
            'UPDATE_CURRENT_USER_FAILURE',
            result.response.data)
        })
    })
  },
  logout (context) {
    return new Promise(() => {
      setItem('accessToken', '')
      context.commit('LOGOUT')
    })
  }
}
