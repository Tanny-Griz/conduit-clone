import { mutationTypes as authMutationTypes } from './auth'

export const state = () => ({
  isSubmitting: false,
  validationErrors: null
})

export const mutations = {
  [authMutationTypes.updateCurrentUserStart] (state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [authMutationTypes.updateCurrentUserSuccess] (state) {
    state.isSubmitting = false
  },
  [authMutationTypes.updateCurrentUserFailure] (state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}
