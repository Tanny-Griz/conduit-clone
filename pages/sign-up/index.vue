<template>
  <section class="sign-up-page section">
    <h2 class="title is-2 has-text-centered">
      {{ $t('signUp.signUp') }}
    </h2>
    <h6 class="title is-6 has-text-centered">
      <nuxt-link to="/sign-in">
        {{ $t('signUp.haveAnAccount') }}
      </nuxt-link>
    </h6>
    <div class="columns is-centered">
      <div class="column is-7">
        <ValidationErrors v-if="validationErrors" :validation-errors="validationErrors" />
        <div class="field">
          <label class="label">{{ $t('signUp.username') }}</label>
          <div class="control has-icons-right">
            <input
              v-model="username"
              class="input"
              type="text"
              :placeholder="$t('signUp.inputName')"
              value=""
            >
            <span class="icon is-small is-right">
              <i class="fas fa-check" />
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">{{ $t('signUp.email') }}</label>
          <div class="control has-icons-right">
            <input
              v-model="email"
              class="input"
              type="email"
              :placeholder="$t('signUp.inputEmail')"
            >
            <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle" />
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">{{ $t('signUp.password') }}</label>
          <div class="control has-icons-right">
            <input
              v-model="password"
              class="input"
              type="password"
              placeholder=""
            >
            <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle" />
            </span>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button :disabled="isSubmitting" class="button is-link" @click="onSubmit">
              {{ $t('signUp.submit') }}
            </button>
          </div>
          <div class="control">
            <button class="button is-link is-light">
              {{ $t('signUp.cansel') }}
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
  name: 'SignUpPage',
  components: {
    ValidationErrors
  },
  data () {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  head () {
    return {
      titleTemplate: 'Sign Up Page'
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
      this.$store.dispatch('auth/register', { username: this.username, email: this.email, password: this.password }).then(() => { this.$router.push('/') })
    }
  }
}
</script>
