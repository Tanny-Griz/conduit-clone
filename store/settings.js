export const state = () => ({
  isSubmitting: false,
  validationErrors: null
})

export const mutations = {
  UPDATE_CURRENT_USER_START (state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  UPDATE_CURRENT_USER_SUCCESS (state) {
    state.isSubmitting = false
  },
  UPDATE_CURRENT_USER_FAILURE (state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}
