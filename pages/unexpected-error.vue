<template>
  <div class="no-access-page">
    <h1 class="has-text-weight-bold">
      Unexpected Error Page
    </h1>
    <p>500</p>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'UnexpectedError',
  head () {
    return {
      titleTemplate: 'Unexpected Error Page'
    }
  }
})
</script>
