<template>
  <section class="tag-page section">
    <h2 class="has-text-info has-text-weight-bold mb-3 pt-2 px-2">
      Popular Tags
    </h2>
    <TagList
      :is-loading="isLoadingTags"
      :tags="tags"
    />
    <h1 class="mb-3">
      Results of <strong>{{ tagName }}</strong> tag
    </h1>
    <ArticleCommon :api-url="apiUrl" :tag-name="tagName" />
  </section>
</template>

<script>
import tags from '@/api/tags'
import TagList from '@/components/tag-list/TagList.vue'
import ArticleCommon from '@/components/article-common/ArticleCommon.vue'

export default {
  name: 'Tag',
  components: {
    TagList,
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
