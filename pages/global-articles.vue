<template>
  <section class="global-articles-page section">
    <PopularTagsRow />
    <ArticlesWrapperVue :api-url="apiUrl" />
  </section>
</template>

<script>
import PopularTagsRow from '@/components/popular-tags-row/PopularTagsRow.vue'
import ArticlesWrapperVue from '@/components/articles-wrapper/ArticlesWrapper.vue'

export default {
  name: 'GlobalArticlesPage',
  components: {
    PopularTagsRow,
    ArticlesWrapperVue
  },
  data: () => {
    return {
      apiUrl: '/articles'
      // realWorldTags: [],
    }
  },
  async fetch () {
    // await this.getRealWorldArticles()
    // await this.getRealWorldTags()
  },
  head () {
    return {
      titleTemplate: 'Global Articles Page' // to change
    }
  }
}
</script>
