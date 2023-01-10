<template>
  <div>
    <NavBar />
    <section class="main-content columns">
      <aside class="column is-2 section">
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <NuxtLink :to="item.to" exact-active-class="has-background-info-dark has-text-white-bis">
              {{ item.title }}
            </NuxtLink>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <!-- pages -->
        <Nuxt />
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar/NavBar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    NavBar
  },
  data () {
    return {
      items: [
        {
          title: 'Home',
          to: { name: 'index' }
        },
        {
          title: 'Global Articles',
          to: { name: 'GlobalArticles' }
        },
        {
          title: 'Your Articles',
          to: { name: 'YourArticles' }
        }
      ]
    }
  }
  // mounted () {
  //   this.$store.dispatch('auth/' + actionTypes.getCurrentUser)
  //   console.log('currentUser', this.currentUser)
  // }
}
</script>
