<template>
  <section class="global-articles-page section">
    <PopularTagsRow />
    <div class="global-articles">
      <ArticleCard
        v-for="(article, index) in realWorldArticles.articles"
        :key="article.title + index"
        class="mb-6"
        :author="article.author"
        :title="article.title"
        :description="article.description"
        :tag-list="article.tagList"
        :updated-at="article.updatedAt"
      />
    </div>
  </section>
</template>

<script lang="js">
import PopularTagsRow from '@/components/popular-tags-row/PopularTagsRow.vue'
import ArticleCard from '@/components/article-card/ArticleCard.vue'

export default {
  name: 'GlobalArticlesPage',
  components: {
    PopularTagsRow,
    ArticleCard
  },
  data: () => ({
    realWorldArticles: [],
    realWorldTags: [],
    limitOfArticles: 10,
    offset: 0
  }),
  async fetch () {
    await this.getRealWorldArticles()
    // await this.getRealWorldTags()
  },
  head () {
    return {
      titleTemplate: 'Global Articles Page'
    }
  },
  methods: {
    async getRealWorldArticles () {
      try {
        this.realWorldArticles = await this.$realworld.getRealWorldArticles(10, 0)
      } catch (error) {
        // TODO: Handle possible errors
      }
    }
    // async getRealWorldTags () {
    //   try {
    //     this.realWorldTags = await this.$realworld.getRealWorldTags()
    //   } catch (error) {
    //     // TODO: Handle possible errors
    //   }
    // }
  }
}
</script>
