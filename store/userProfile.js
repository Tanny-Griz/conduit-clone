import getUserProfile from '@/api/userProfile'

export const state = () => ({
  data: null,
  isLoading: false,
  error: null
})

export const getters = {
  data: (state) => {
    return state.data
  },
  isLoading: (state) => {
    return Boolean(state.isLoading)
  }
}

export const mutations = {
  GET_USER_PROFILE_START (state) {
    state.isLoading = true
    state.data = null
  },
  GET_USER_PROFILE_SUCCESS (state, payload) {
    state.data = payload
    state.isLoading = false
  },
  GET_USER_PROFILE_FAILURE (state, payload) {
    state.isLoading = false
    state.error = payload
  }
}

export const actions = {
  getUserProfile (context, { slug }) {
    return new Promise((resolve) => {
      context.commit('GET_USER_PROFILE_START')
      getUserProfile.getUserProfile(slug).then((userProfile) => {
        context.commit('GET_USER_PROFILE_SUCCESS', userProfile)
        resolve(userProfile)
      }).catch((result) => {
        context.commit('GET_USER_PROFILE_FAILURE', result.response.data.errors)
      })
    })
  }
}
