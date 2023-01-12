<template>
  <section class="global-articles-page section">
    <PopularTagsRow />
    <ArticlesWrapper :api-url="apiUrl" />
  </section>
</template>

<script>
import PopularTagsRow from '@/components/popular-tags-row/PopularTagsRow.vue'
import ArticlesWrapper from '@/components/articles-wrapper/ArticlesWrapper.vue'

export default {
  name: 'GlobalArticles',
  components: {
    PopularTagsRow,
    ArticlesWrapper
  },
  data: () => {
    return {
      apiUrl: 'articles'
      // realWorldTags: [],
    }
  },
  async fetch () {
    // await this.getRealWorldArticles()
    // await this.getRealWorldTags()
  },
  head () {
    return {
      titleTemplate: 'Global Articles' // to change
    }
  }
}
</script>
