<template>
  <section class="tag-page section">
    <PopularTagsRow
      :is-loading="isLoadingTags"
      :tags="tags"
    />
    <h1 class="mb-3">Results of <strong>{{ tagName }}</strong> tag</h1>
    <ArticleCommon :api-url="apiUrl" :tag-name="tagName" />
  </section>
</template>

<script>
import tags from '@/api/tags'
import PopularTagsRow from '@/components/popular-tags-row/PopularTagsRow.vue'
import ArticleCommon from '@/components/article-common/ArticleCommon.vue'

export default {
  name: 'Tag',
  components: {
    PopularTagsRow,
    ArticleCommon
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
      titleTemplate: 'Tag'
    }
  },
  computed: {
    apiUrl () {
      return '/articles'
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
