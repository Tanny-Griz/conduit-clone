<template>
  <ul class="validation-errors">
    <li class="has-text-danger" v-for="errorMessage, index in errorMessages" :key="errorMessage + index">
      {{ errorMessage }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true
    }
  },
  computed: {
    errorMessages () {
      return Object.keys(this.validationErrors).map((name) => {
        const msgs = this.validationErrors[name].join(', ')
        return `${name} ${msgs}`
      })
    }
  }
}
</script>
