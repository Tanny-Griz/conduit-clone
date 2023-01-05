<template>
  <section class="section">
    <div>
      <p>
        Hey! You are on a site clone
        all api is taken from there. You can: - register; - edit your data; -
        write your article; - add tags to your articles; - view global articles; -
        add favorite posts to favorites; - filter articles by popular tags; - go
        to the user's page, see all the articles of this user and also subscribe
        to the user you like
      </p>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'IndexPage',
  head () {
    return {
      titleTemplate: 'General Page'
    }
  }
})
</script>
