import addToFavoritesApi from '@/api/addToFavorites'

export const mutations = {
  ADD_TO_FAVORITES_START () {},
  ADD_TO_FAVORITES_SUCCESS () {},
  ADD_TO_FAVORITES_FAILURE () {}
}

export const actions = {
  addToFavorites (context, { slug, isFavotited }) {
    return new Promise((resolve) => {
      context.commit('ADD_TO_FAVORITES_START')
      const promise = isFavotited
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug)

      promise.then((article) => {
        context.commit('ADD_TO_FAVORITES_SUCCESS', article)
        resolve(article)
      }).catch(() => {
        context.commit('ADD_TO_FAVORITES_FAILURE')
      })
    })
  }
}
