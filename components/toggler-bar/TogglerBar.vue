<template>
  <div class="toggler-bar section pb-2">
    <ul class="menu-list is-flex">
      <li>
        <NuxtLink :to="'/'" exact-active-class="has-background-dark has-text-white-bis">
          {{ $t('toggleBar.globalArticles') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink v-if="isLoggedIn" :to="'/articles-of-followed'" exact-active-class="has-background-dark has-text-white-bis">
          {{ $t('toggleBar.articlesOfFollowed') }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink v-if="tagName" :to="`/tags/${tagName}`" exact-active-class="has-background-dark has-text-white-bis">
          <b-icon icon="pound" size="is-small" /> {{ tagName }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TogglerBar',
  computed: {
    tagName () {
      return this.$route.params.tag || ''
    },
    isLoggedIn () {
      return this.$store.state.auth.isLoggedIn
    }
  }
}
</script>
