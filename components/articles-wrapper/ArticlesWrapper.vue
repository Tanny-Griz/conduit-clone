<template>
  <div class="articles-wrapper">
    <div>
      <ArticleCard
        v-for="(article, index) in articles"
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
    <Pagination
      :total="articlesCount"
      :limit="limitOfArticles"
      :url="baseUrl"
      @currentPageChange="onCurrentPageChange"
    />
  </div>
</template>

<script>
import ArticleCard from '@/components/article-card/ArticleCard.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { limitOfArticles } from '@/helpers'

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
      articles: [],
      articlesCount: null,
      limitOfArticles
    }
  },
  async fetch () {
    await this.getRealWorldArticles()
  },
  computed: {
    currentPage () {
      return +this.$route.query.page || 1
    },
    baseUrl () {
      return this.$route.path
    },
    offset () {
      return this.currentPage * this.limitOfArticles - this.limitOfArticles // p 1 * 10 - 10 = 0, p 2 * 10 - 10 = 10
    }
  },
  watch: {
    currentPage () {
      this.getRealWorldArticles()
    }
  },
  methods: {
    onCurrentPageChange (current) {
      this.$router.push({
        query: { ...this.$route.query, page: current.toString() }
      })
    },
    async getRealWorldArticles () {
      this.isLoading = true
      try {
        const realWorldArticles = await this.$realworld.getRealWorldArticles(this.apiUrl, this.limitOfArticles, this.offset)
        this.articles = realWorldArticles.articles
        this.articlesCount = realWorldArticles.articlesCount
        this.isLoading = false
      } catch (error) {
        // TODO: Handle possible errors
      }
    }
  }
}
</script>
