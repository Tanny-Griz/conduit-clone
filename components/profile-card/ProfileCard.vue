<template>
  <section class="profiles-card section">
    <div v-if="userProfile" class="has-background-light mb-4">
      <div class="container has-text-centered py-5">
        <img width="100px" class="pt-5" :src="userProfile.image" alt="uder-image">
        <h1 class="is-size-2 has-text-weight-bold py-3">
          {{ userProfile.username }}
        </h1>
        <p v-if="userProfile.bio" class="mb-3">
          <i>"{{ userProfile.bio }}"</i>
        </p>
        <b-button
          v-if="!isCurrentUserProfile"
          class="is-small is-outlined is-align-items-start"
          @click="onFollowUser"
        >
          <span>{{ isFollowingOpt ? '- Unfollow' : '+ Follow' }} {{ userProfile.username }}</span>
        </b-button>
        <nuxt-link v-if="isCurrentUserProfile" to="/settings" class="mr-3">
          <b-icon icon="cog-outline" size="is-small" />
          <strong>Edit Profile Settings</strong>
        </nuxt-link>
      </div>
    </div>
    <div class="container">
      <b-tabs v-model="activeTab" class="test">
        <b-tab-item label="My Posts">
          <ArticlesWrapper :api-url="apiUrl" />
        </b-tab-item>
        <b-tab-item label="Favorited Posts">
          <ArticlesWrapper :api-url="apiUrlFavorited" />
        </b-tab-item>
      </b-tabs>
    </div>
  </section>
</template>

<script>
import ArticlesWrapper from '@/components/articles-wrapper/ArticlesWrapper.vue'

export default {
  name: 'ProfileCard',
  components: {
    ArticlesWrapper
  },
  props: {
    userProfile: {
      type: Object,
      required: true,
      default: () => null
    },
    currentUserName: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      isFollowingOpt: this.userProfile.following,
      activeTab: 0
    }
  },
  computed: {
    apiUrl () {
      return `/articles?author=${this.userProfile.username}`
    },
    apiUrlFavorited () {
      return `/articles?favorited=${this.userProfile.username}`
    },
    isCurrentUserProfile () {
      return this.userProfile.username === this.currentUserName
    }
  },
  methods: {
    onFollowUser () {
      this.$store.dispatch('userProfile/followUser', {
        slug: this.userProfile.username,
        isFollowing: this.isFollowingOpt
      })
      this.isFollowingOpt = !this.isFollowingOpt
    }
  }
}
</script>
