<template>
  <section class="articles-of-followed-page section">
    <PopularTagsRow
      :is-loading="isLoadingTags"
      :tags="tags"
    />
    <ArticleCommon :api-url="apiUrl" />
  </section>
</template>

<script>
import tags from '@/api/tags'
import PopularTagsRow from '@/components/popular-tags-row/PopularTagsRow.vue'
import ArticleCommon from '@/components/article-common/ArticleCommon.vue'

export default {
  name: 'YourArticlesPage',
  components: {
    ArticleCommon,
    PopularTagsRow
  },
  data () {
    return {
      apiUrl: 'articles/feed',
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
      titleTemplate: 'Your Articles Page'
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
