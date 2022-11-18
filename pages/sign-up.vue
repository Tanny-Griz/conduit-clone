<template>
  <section class="section">
    <h2 class="title is-2 has-text-centered">
      Sign up
    </h2>
    <h6 class="title is-6 has-text-centered">
      <nuxt-link to="/sign-in">
        Have an account?
      </nuxt-link>
    </h6>
    <div class="columns is-centered">
      <div class="column is-7">
        <div class="field">
          <label class="label">Username</label>
          <div class="control has-icons-right">
            <input
              class="input"
              type="text"
              placeholder="Text input"
              value=""
            >
            <!-- <span>
              <i class="fas fa-user"></i>
            </span> -->
            <span class="icon is-small is-right">
              <i class="fas fa-check" />
            </span>
          </div>
          <!-- <p class="help is-success">This username is available</p> -->
        </div>

        <div class="field">
          <label class="label">Email</label>
          <div class="control has-icons-right">
            <input
              class="input"
              type="email"
              placeholder="Email input"
            >
            <!-- <span>
              <i class="fas fa-envelope"></i>
            </span> -->
            <span class="icon is-small is-right">
              <i class="fas fa-exclamation-triangle" />
            </span>
          </div>
          <!-- <p class="help is-danger">This email is invalid</p> -->
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control has-icons-right">
            <input
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
            <button class="button is-link">
              Submit
            </button>
          </div>
          <div class="control">
            <button class="button is-link is-light">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SignUpPage',
  head () {
    return {
      titleTemplate: 'Sign Up Page'
    }
  }
}
</script>
