<template>
  <section class="section">
    <div>
      Hey! You are on a site clone
      <!-- <nuxt-link to="http://angular.realworld.io/">realworld.io</nuxt-link> and -->
      all api is taken from there. You can: - register; - edit your data; -
      write your article; - add tags to your articles; - view global articles; -
      add favorite posts to favorites; - filter articles by popular tags; - go
      to the user's page, see all the articles of this user and also subscribe
      to the user you like
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'checkAuth',
  data () {
    return {
      info: null
    }
  },
  head () {
    return {
      titleTemplate: 'General Page'
    }
  },
  created () {
    this.$log('some')
  }
}
</script>
