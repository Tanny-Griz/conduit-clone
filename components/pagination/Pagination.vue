<template>
  <b-pagination
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
import { range } from '@/helpers'

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
    }
  },
  data () {
    return {
      current: +this.$route.query.page || 1,
      size: 'is-small',
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 1,
      order: ''
    }
  },
  computed: {
    pages () {
      const pagesCount = Math.ceil(this.total / this.limit)
      return range(this.startPage, pagesCount)
    }
  },
  methods: {
    onChange () {
      this.$emit('currentPageChange', this.current)
    }
  }
}
</script>
