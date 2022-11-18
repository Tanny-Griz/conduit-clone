<template>
  <div class="no-access-page">
    <h1 class="has-text-weight-bold">
      No Access Page
    </h1>
    <p>404</p>
  </div>
</template>

<script lang="js">
import Vue from 'vue'

export default Vue.extend({
  name: 'NoAccessPage',
  head () {
    return {
      titleTemplate: 'No Access Page'
    }
  }
})
</script>
