<template>
  <section class="global-articles-page section">
    <h2 class="has-text-info has-text-weight-bold mb-3 pt-2 px-2">
      Popular Tags
    </h2>
    <TagList
      :is-loading="isLoadingTags"
      :tags="tags"
    />
    <ArticlesWrapper :api-url="apiUrl" />
  </section>
</template>

<script>
import tags from '@/api/tags'
import ArticlesWrapper from '@/components/articles-wrapper/ArticlesWrapper.vue'
import TagList from '@/components/tag-list/TagList.vue'

export default {
  name: 'GlobalArticles',
  components: {
    TagList,
    ArticlesWrapper
  },
  data () {
    return {
      apiUrl: '/articles',
      apiForTags: '/tags',
      isLoadingTags: false,
      tags: []
    }
  },
  async fetch () {
    await this.getRealWorldTags()
  },
  head () {
    return {
      titleTemplate: 'Global Articles'
    }
  },
  computed: {
    currentPage () {
      return +this.$route.query.page || 1
    },
    baseUrl () {
      return this.$route.path
    },
    offset () {
      return this.currentPage * this.limitOfArticles - this.limitOfArticles // p 1 * 10 - 10 = 0, p 2 * 10 - 10 = 10
    }
  },
  methods: {
    async getRealWorldTags () {
      this.isLoadingTags = true
      try {
        const realWorldTags = await tags.getRealWorldTags(this.apiForTags)
        this.tags = realWorldTags.data.tags
        this.isLoadingTags = false
      } catch (error) {
        // TODO: Handle possible errors
      }
    }
  }
}
</script>
