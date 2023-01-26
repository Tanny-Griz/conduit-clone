<template>
  <section class="articles-of-followed-page section">
    <h2 class="has-text-info has-text-weight-bold mb-3 pt-2 px-2">
      Popular Tags
    </h2>
    <TagList
      :is-loading="isLoadingTags"
      :tags="tags"
    />
    <ArticleCommon :api-url="apiUrl" />
  </section>
</template>

<script>
import tags from '@/api/tags'
import TagList from '@/components/tag-list/TagList.vue'
import ArticleCommon from '@/components/article-common/ArticleCommon.vue'

export default {
  name: 'YourArticlesPage',
  components: {
    ArticleCommon,
    TagList
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
