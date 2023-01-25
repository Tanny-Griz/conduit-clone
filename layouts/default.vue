<template>
  <div>
    <NavBar />
    <div class="main-content">
      <TogglerBar />
      <!-- pages -->
      <Nuxt />
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar/NavBar.vue'
import TogglerBar from '@/components/toggler-bar/TogglerBar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    NavBar,
    TogglerBar
  }
}
</script>
