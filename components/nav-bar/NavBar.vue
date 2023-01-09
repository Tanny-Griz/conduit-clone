<template>
  <b-navbar type="is-light">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Realworld
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div" class="is-flex is-align-items-center is-flex-wrap-wrap">
        <nuxt-link v-if="isLoggedIn" to="new-article" class="mr-3">
          <b-icon icon="pencil-remove-outline" size="is-small" />
          <strong>New article</strong>
        </nuxt-link>
        <nuxt-link v-if="isLoggedIn" to="settings" class="mr-3">
          <b-icon icon="cog-outline" size="is-small" />
          <strong>Settings</strong>
        </nuxt-link>
        <nuxt-link v-if="!isLoggedIn" to="sign-up" class="mr-3">
          <strong>Sign up</strong>
        </nuxt-link>
        <nuxt-link v-if="!isLoggedIn" to="log-in" class="mr-3">
          <strong>Log in</strong>
        </nuxt-link>
        <nuxt-link v-if="currentUser" to="" class="is-flex mr-3">
          <div class="is-flex is-align-items-center">
            <img v-if="currentUser.image" class="mr-2" :src="currentUser.image" alt="image">
            <strong>{{ currentUser.email }}12</strong>
          </div>
        </nuxt-link>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { actionTypes } from '@/store/auth'

export default {
  name: 'NavBar',
  computed: {
    currentUser () {
      return this.$store.getters['auth/currentUser']
    },
    isLoggedIn () {
      return this.$store.getters['auth/isLoggedIn']
    },
    isAnonymous () {
      return this.$store.getters['auth/isAnonymous']
    }
  },
  mounted () {
    this.$store.dispatch('auth/' + actionTypes.getCurrentUser)
    console.log('currentUser', this.currentUser)
  }
}
</script>
