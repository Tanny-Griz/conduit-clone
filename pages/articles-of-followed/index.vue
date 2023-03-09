<template>
  <section class="articles-of-followed-page section">
    <h2 class="has-text-info has-text-weight-bold mb-3 pt-2 px-2">
      {{ $t('articlesOfFollowedPage.popularTags') }}
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
import TagList from '@/components/tag-list/TagList.vue'
import ArticlesWrapper from '@/components/articles-wrapper/ArticlesWrapper.vue'

export default {
  name: 'ArticlesOfFollowedPage',
  components: {
    ArticlesWrapper,
    TagList
  },
  middleware: ['user-management'],
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
