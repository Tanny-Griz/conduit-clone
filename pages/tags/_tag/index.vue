<template>
  <section class="tag-page section">
    <h2 class="has-text-info has-text-weight-bold mb-3 pt-2 px-2">
      {{ $t('tagPage.popularTags') }}
    </h2>
    <TagList
      :is-loading="isLoadingTags"
      :tags="tags"
    />
    <h1 class="mb-3">
      {{ $t('tagPage.resultsOf') }} <strong>{{ tagName }}</strong> {{ $t('tagPage.tag') }}
    </h1>
    <ArticlesWrapper :api-url="apiUrl" :tag-name="tagName" />
  </section>
</template>

<script>
import tags from '@/api/tags'
import TagList from '@/components/tag-list/TagList.vue'
import ArticlesWrapper from '@/components/articles-wrapper/ArticlesWrapper.vue'

export default {
  name: 'TagPage',
  components: {
    TagList,
    ArticlesWrapper
  },
  data () {
    return {
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
      titleTemplate: 'Tag Page'
    }
  },
  computed: {
    apiUrl () {
      return `/articles?tag=${this.tagName}`
    },
    tagName () {
      return this.$route.params.tag || ''
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
