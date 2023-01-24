<template>
  <section class="articles-of-followed-page section">
    <PopularTagsRow
      :is-loading="isLoadingTags"
      :tags="tags"
    />
    <h1 v-if="isLoggedIn" class="has-text-weight-bold">
      To view articles by featured authors, you must <nuxt-link to="sign-up">
        register
      </nuxt-link> or <nuxt-link to="/log-in">
        log in
      </nuxt-link> your account and follow the user
    </h1>
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
  computed: {
    isLoggedIn () {
      return this.$store.getters['auth/isLoggedIn']
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
