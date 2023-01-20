<template>
  <section class="global-articles-page section">
    <PopularTagsRow
      :is-loading="isLoadingTags"
      :tags="tags"
    />
    <ArticleCommon :api-url="apiUrl" />
  </section>
</template>

<script>
import tags from '@/api/tags'
import ArticleCommon from '@/components/article-common/ArticleCommon.vue'
import PopularTagsRow from '@/components/popular-tags-row/PopularTagsRow.vue'

export default {
  name: 'GlobalArticles',
  components: {
    PopularTagsRow,
    ArticleCommon
  },
  data () {
    return {
      apiUrl: 'articles',
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
