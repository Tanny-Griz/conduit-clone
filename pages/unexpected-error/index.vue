<template>
  <div class="unexpected-error-page section">
    <h1 class="has-text-weight-bold">
      {{ $t('unexpectedErrorPage.unexpectedErrorPage') }}
    </h1>
    <p>500</p>
  </div>
</template>

<script>
export default {
  name: 'UnexpectedErrorPage',
  head () {
    return {
      titleTemplate: 'Unexpected Error Page'
    }
  }
}
</script>
