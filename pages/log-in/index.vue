<template>
  <section class="log-in-page section">
    <h2 class="title is-2 has-text-centered">
      {{ $t('logIn.logIn') }}
    </h2>
    <h6 class="title is-6 has-text-centered">
      <nuxt-link to="/sign-up">
        {{ $t('logIn.needAnAccount') }}
      </nuxt-link>
    </h6>
    <div class="columns is-centered">
      <div class="column is-7">
        <ValidationErrors v-if="validationErrors" :validation-errors="validationErrors" />
        <div class="field">
          <label class="label">{{ $t('logIn.email') }}</label>
          <div class="control has-icons-right">
            <input
              v-model="email"
              class="input"
              type="email"
              :placeholder="$t('logIn.inputEmail')"
            >
            <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle" />
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">{{ $t('logIn.password') }}</label>
          <div class="control has-icons-right">
            <input
              v-model="password"
              class="input"
              type="password"
            >
            <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle" />
            </span>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button :disabled="isSubmitting" class="button is-link" @click="onSubmit">
              {{ $t('logIn.submit') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ValidationErrors from '@/components/validation-errors/ValidationErrors.vue'

export default {
  name: 'LogInPage',
  components: {
    ValidationErrors
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  head () {
    return {
      titleTemplate: 'Log in Page'
    }
  },
  computed: {
    isSubmitting () {
      return this.$store.state.auth.isSubmitting
    },
    validationErrors () {
      return this.$store.state.auth.validationErrors
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('auth/login', { email: this.email, password: this.password }).then(() => { this.$router.push('/') })
    }
  }
}
</script>
