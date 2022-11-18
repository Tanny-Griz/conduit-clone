<template>
  <b-navbar type="is-light">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        Realworld
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <nuxt-link to="sign-up" class="button has-background-info-dark has-text-white-bis">
            <strong>Sign up</strong>
          </nuxt-link>
          <nuxt-link to="log-in" class="button has-background-grey-lighter">
            Log in
          </nuxt-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
