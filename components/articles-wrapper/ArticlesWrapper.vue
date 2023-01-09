<template>
  <div class="articles-wrapper">
    <p>articles-wrapper</p>
    <ArticleCard
      v-for="(article, index) in realWorldArticles.articles"
      :key="article.title + index"
      class="mb-6"
      :is-loading="isLoading"
      :author="article.author"
      :title="article.title"
      :description="article.description"
      :tag-list="article.tagList"
      :updated-at="article.updatedAt"
    />
  </div>
</template>

<script>
import ArticleCard from '@/components/article-card/ArticleCard.vue'

export default {
  name: 'ArticlesWrapper',
  components: {
    ArticleCard
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      isLoading: false,
      realWorldArticles: [],
      limitOfArticles: 10,
      offset: 0
    }
  },
  async fetch () {
    await this.getRealWorldArticles()
  },
  methods: {
    async getRealWorldArticles () {
      this.isLoading = true
      try {
        this.realWorldArticles = await this.$realworld.getRealWorldArticles(this.apiUrl, 10, 0)
        this.isLoading = false
      } catch (error) {
        // TODO: Handle possible errors
      }
    }
  }
}
</script>
