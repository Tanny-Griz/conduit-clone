<template>
  <div class="unexpected-error-page">
    <h1 class="has-text-weight-bold">
      Unexpected Error Page
    </h1>
    <p>500</p>
  </div>
</template>

<script>
export default {
  name: 'UnexpectedError',
  head () {
    return {
      titleTemplate: 'Unexpected Error Page'
    }
  }
}
</script>
