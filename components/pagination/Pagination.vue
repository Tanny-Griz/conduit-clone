<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous"><b-icon icon="arrow-left" size="is-small" /></a>
    <a class="pagination-next"><b-icon icon="arrow-right" size="is-small" /></a>
    <ul class="pagination-list">
      <li v-for="page in pages" :key="page">
        <NuxtLink :to="{path: url, query: {page: page}}" :class="{'is-current': currentPage === page }" class="pagination-link" exact-active-class="has-background-info-dark has-text-white-bis">
          {{ page }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
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
    currentPage: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      startPage: 1
    }
  },
  computed: {
    pages () {
      const pagesCount = Math.ceil(this.total / this.limit)
      return range(this.startPage, pagesCount)
    }
  }
}
</script>
