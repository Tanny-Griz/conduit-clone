<template>
  <b-navbar type="is-light">
    <template #brand>
      <div class="is-flex is-justify-content-center is-align-items-center">
        <b-navbar-item tag="nuxt-link" to="/" class="has-text-dark has-text-weight-bold">
          <strong>Conduit clone</strong>
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
      </div>
    </template>

    <template #end>
      <b-navbar-item tag="div" class="is-flex is-align-items-center is-flex-wrap-wrap">
        <nuxt-link v-if="isLoggedIn" to="/article/new-article" class="mr-3">
          <b-icon icon="pencil-remove-outline" size="is-small" />
          <strong>{{ $t('navBar.newArticle') }}</strong>
        </nuxt-link>
        <nuxt-link v-if="isLoggedIn" to="/settings" class="mr-3">
          <b-icon icon="cog-outline" size="is-small" />
          <strong>{{ $t('navBar.settings') }}</strong>
        </nuxt-link>
        <nuxt-link v-if="!isLoggedIn" to="/sign-up" class="mr-3">
          <strong>{{ $t('navBar.signUp') }}</strong>
        </nuxt-link>
        <nuxt-link v-if="!isLoggedIn" to="/log-in" class="mr-3">
          <strong>{{ $t('navBar.logIn') }}</strong>
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
