<template>
  <b-button class="is-inverted" @click="$emit('addToFavorite', articleSlug)">
    <span class="is-flex is-justify-content-center is-align-items-center"><b-icon is-clicable :icon="isFavorited ? 'heart' : 'heart-outline'" size="is-normal" class="mr-1" />
      <span>{{ favoritesCount }}</span></span>
  </b-button>
</template>

<script>
export default {
  name: 'FavoritesButton',
  props: {
    isFavorited: {
      type: Boolean,
      required: true
    },
    articleSlug: {
      type: String,
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    }
  }
}
</script>
