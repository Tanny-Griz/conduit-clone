import addToFavoritesApi from '@/api/addToFavorites'

export const mutations = {
  ADD_TO_FAVORITES () {}
}

export const actions = { // to articles !!
  addToFavorites ({ commit }, { slug, isFavotited }) {
    const promise = isFavotited
      ? addToFavoritesApi.removeFromFavorites(slug)
      : addToFavoritesApi.addToFavorites(slug)

    promise.then((article) => {
      commit('ADD_TO_FAVORITES', article)
    }).catch((result) => {
      console.log(result.response.data.errors)
    })
  }
}
