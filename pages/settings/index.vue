<template>
  <section v-if="currentUser" class="settings-page columns is-centered section">
    <div class="column is-7">
      <h2 class="is-size-3 mb-3">
        {{ $t('settingsPage.settings') }}
      </h2>
      <ValidationErrors v-if="validationErrors" class="mb-2" :validation-errors="validationErrors" />
      <form @submit.prevent="onSubmit">
        <b-field>
          <b-input v-model="form.image" placeholder="URL of profile picture" />
        </b-field>
        <b-field>
          <b-input v-model="form.username" placeholder="Username" />
        </b-field>
        <b-field>
          <b-input v-model="form.bio" maxlength="200" type="textarea" placeholder="Short bio about you" />
        </b-field>
        <b-field>
          <b-input v-model="form.email" type="email" placeholder="Email" />
        </b-field>
        <b-field>
          <b-input v-model="form.password" type="password" placeholder="New Password" />
        </b-field>
        <b-field>
          <b-button
            native-type="submit"
            :disable="isSubmitting"
            type="is-success"
          >
            {{ $t('settingsPage.updateSettings') }}
          </b-button>
        </b-field>
      </form>
      <hr>
      <b-button class="is-danger is-outlined" @click="logout">
        {{ $t('settingsPage.clickToLogout') }}
      </b-button>
    </div>
  </section>
</template>

<script>
import ValidationErrors from '@/components/validation-errors/ValidationErrors.vue'

export default {
  name: 'SettingsPage',
  components: {
    ValidationErrors
  },
  head () {
    return {
      titleTemplate: 'Settings Page'
    }
  },
  computed: {
    validationErrors () {
      return this.$store.state.auth.validationErrors
    },
    isSubmitting () {
      return this.$store.state.auth.isSubmitting
    },
    currentUser () {
      return this.$store.state.auth.currentUser
    },
    form () {
      return {
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        image: this.currentUser.image,
        email: this.currentUser.email,
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('auth/updateCurrentUser', this.form)
    },
    logout () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  }
}
</script>
