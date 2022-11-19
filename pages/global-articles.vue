<template>
  <section class="global-articles-page section">
    <PopularTagsRow />
    <div class="global-articles">
      <ArticleCard
        v-for="(article) in realWorldArticles.articles"
        :id="generateKey(article.title)"
        :key="generateKey(article.title)"
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

<script>
import PopularTagsRow from '@/components/popular-tags-row/PopularTagsRow.vue'
import ArticleCard from '@/components/article-card/ArticleCard.vue'

import {
  generateKey
} from '@/helpers'

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
  //   await this.getRealWorldTags()
  },
  head () {
    return {
      titleTemplate: 'Global Articles Page'
    }
  },
  methods: {
    generateKey,
    async getRealWorldArticles () {
      try {
        this.realWorldArticles = await this.$realworld.getRealWorldArticles(10, 0)
        console.log(this.realWorldArticles)
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
