<template>
  <section class="profiles-card section">
    <div class="has-background-light mb-4">
      <div class="container has-text-centered py-5">
        <img width="100px" class="pt-5" :src="userProfile.image" alt="uder-image">
        <h1 class="is-size-2 has-text-weight-bold py-3">
          {{ userProfile.username }}
        </h1>
        <p v-if="userProfile.bio">
          <i>"{{ userProfile.bio }}"</i>
        </p>
        <nuxt-link v-if="isCurrentUserProfile" to="/settings" class="mr-3">
          <b-icon icon="cog-outline" size="is-small" />
          <strong>Edit Profile Settings</strong>
        </nuxt-link>
      </div>
    </div>
    <div class="container">
      <b-tabs class="test">
        <b-tab-item label="My Posts" title="First tab">
          <ArticleCommon :api-url="apiUrl" />
        </b-tab-item>

        <b-tab-item label="Favorited Posts" title="Second tab">
          <ArticleCommon :api-url="apiUrlFavorited" />
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
import ArticleCommon from '@/components/article-common/ArticleCommon.vue'

export default {
  name: 'ProfileCard',
  components: {
    ArticleCommon
  },
  props: {
    userProfile: {
      type: Object,
      required: true,
      default: () => null
    },
    isCurrentUserProfile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.currentUser
    },
    apiUrl () {
      return `/articles?author=${this.userProfile.username}`
    },
    apiUrlFavorited () {
      return `/articles?favorited=${this.userProfile.username}`
    }
  }
}
</script>
