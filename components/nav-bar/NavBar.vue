<template>
  <b-navbar type="is-light">
    <template #brand>
      <b-navbar-item tag="router-link" class="has-text-dark has-text-weight-bold" :to="{ path: '/' }">
        Conduit clone
      </b-navbar-item>
      <div class="lang-dropdown">
      <select v-model="$i18n.locale">
        <option
          v-for="lang in $i18n.locales"
          :key="lang.code"
          :value="lang.code"
        >
          {{ lang.name }}
        </option>
      </select>
    </div>
    </template>

    <template #end>
      <b-navbar-item tag="div" class="is-flex is-align-items-center is-flex-wrap-wrap">
        <nuxt-link v-if="isLoggedIn" to="/article/new-article" class="mr-3">
          <b-icon icon="pencil-remove-outline" size="is-small" />
          <strong>New article</strong>
        </nuxt-link>
        <nuxt-link v-if="isLoggedIn" to="/settings" class="mr-3">
          <b-icon icon="cog-outline" size="is-small" />
          <strong>Settings</strong>
        </nuxt-link>
        <nuxt-link v-if="!isLoggedIn" to="/sign-up" class="mr-3">
          <strong>Sign up</strong>
        </nuxt-link>
        <nuxt-link v-if="!isLoggedIn" to="/log-in" class="mr-3">
          <strong>Log in</strong>
        </nuxt-link>
        <nuxt-link v-if="currentUser" :to="`/profiles/` + currentUser.username" class="is-flex mr-3">
          <div class="is-flex is-align-items-center">
            <img v-if="currentUser.image" class="mr-2" :src="currentUser.image" alt="image">
            <strong>{{ currentUser.username }}</strong>
          </div>
        </nuxt-link>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    currentUser () {
      return this.$store.state.auth.currentUser
    },
    isLoggedIn () {
      return this.$store.state.auth.isLoggedIn
    },
    isAnonymous () {
      return this.$store.state.auth.isAnonymous
    }
  },
  mounted () {
    this.$store.dispatch('auth/getCurrentUser')
  }
}
</script>
