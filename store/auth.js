import authApi from '@/api/auth'

export const state = () => ({
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
})

export const mutations = {
  registerStart (state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  registerSuccess (state, payload) {
    state.isSubmitting = false // reqest ended
    state.currentUser = payload
    state.isLoggedIn = true
  },
  registerFailure (state, payload) {
    state.isSubmitting = false // errors
    state.validationErrors = payload
  }
}

export const actions = {
  register (context, credentials) {
    return new Promise((resolve) => {
      context.commit('registerStart')
      authApi.register(credentials)
        .then((response) => {
          context.commit('registerSuccess', response.data)
          resolve(response.data.user)
        })
        .catch((result) => {
          context.commit('registerFailure', result.response.data.errors)
        })
    })
  }
}
