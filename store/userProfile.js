import getUserProfile from '@/api/userProfile'

export const state = () => ({
  user: null
})

export const getters = {
  user: (state) => {
    return state.user
  }
}

export const mutations = {
  SET_USER_PROFILE (state, user) {
    state.user = user
  },

  FOLLOW_USER (state, user) {
    state.user = user
  }
}

export const actions = {
  setUserProfile ({ commit }, user) {
    commit('SET_USER_PROFILE', user)
  },
  followUser ({ commit }, { slug, isFollowing }) {
    const promise = isFollowing
      ? getUserProfile.unFollow(slug)
      : getUserProfile.follow(slug)

    promise.then((userProfile) => {
      commit('FOLLOW_USER', userProfile)
    }).catch((result) => {
      console.log(result.response.data.errors)
    })
  }
}
