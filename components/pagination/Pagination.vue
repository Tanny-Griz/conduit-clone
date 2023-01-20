<template>
  <b-pagination
    v-if="total"
    v-model="current"
    :total="total"
    :range-before="rangeBefore"
    :range-after="rangeAfter"
    :order="order"
    :size="size"
    :per-page="perPage"
    aria-page-label="Page"
    aria-current-label="Current page"
    @change="onChange"
  />
</template>

<script>

export default {
  name: 'PaginationComponent',
  props: {
    total: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: false
    },
    perPage: {
      type: Number,
      required: true
    },
    rangeBefore: {
      type: Number,
      required: true
    },
    rangeAfter: {
      type: Number,
      required: true
    },
    order: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      current: +this.$route.query.page || 1
    }
  },
  methods: {
    onChange () {
      this.$emit('currentPageChange', this.current)
    }
  }
}
</script>
