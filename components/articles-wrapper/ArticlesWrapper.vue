<template>
  <div class="articles-wrapper">
    <div>
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
    <Pagination :total="total" :limit="limitOfArticles" :current-page="currentPage" :url="url" />
  </div>
</template>

<script>
import ArticleCard from '@/components/article-card/ArticleCard.vue'
import Pagination from '@/components/pagination/Pagination.vue'

export default {
  name: 'ArticlesWrapper',
  components: {
    ArticleCard,
    Pagination
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
      offset: 0,
      total: 500,
      currentPage: 5,
      url: '/tags/dragons'
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
        console.log(this.realWorldArticles)
      } catch (error) {
        // TODO: Handle possible errors
      }
    }
  }
}
</script>
