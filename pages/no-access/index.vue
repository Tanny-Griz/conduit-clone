<template>
  <div class="no-access-page section">
    <h1 class="has-text-weight-bold">
      {{ $t('noAccessPage.noAccessPage') }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'NoAccessPage',
  head () {
    return {
      titleTemplate: 'No Access Page'
    }
  }
}
</script>
