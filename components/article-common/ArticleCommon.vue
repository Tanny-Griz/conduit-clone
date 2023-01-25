<template>
  <div>
    <div class="articles-wrapper">
      <ArticleCard
        v-for="(article, index) in articles"
        :key="article.title + index"
        class="mb-6"
        :is-loading="isLoadingArticles"
        :author="article.author"
        :title="article.title"
        :description="article.description"
        :tag-list="article.tagList"
        :updated-at="article.updatedAt"
        :slug="article.slug"
      />
    </div>
    <Pagination
      :total="articlesCount"
      :limit="limitOfArticles"
      :url="baseUrl"
      :size="size"
      :per-page="perPage"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      @currentPageChange="onCurrentPageChange"
    />
  </div>
</template>

<script>
import articles from '@/api/articles'
import ArticleCard from '@/components/article-card/ArticleCard.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { limitOfArticles } from '@/helpers'

export default {
  name: 'ArticleCommon',
  components: {
    ArticleCard,
    Pagination
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    },
    tagName: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      articles: [],
      isLoadingArticles: false,
      articlesCount: 0,
      limitOfArticles,
      size: 'is-small',
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 1,
      order: ''
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
      this.isLoadingArticles = true
      try {
        if (this.tagName) {
          const apiUrlWithParams = `${this.apiUrl}?tag=${this.tagName}&limit=${this.limitOfArticles}$offset=${this.offset}`
          const realWorldArticles = await articles.getRealWorldArticles(apiUrlWithParams)
          this.articles = realWorldArticles.data.articles
          this.articlesCount = realWorldArticles.data.articlesCount
        } else {
          const apiUrlWithParams = `${this.apiUrl}?limit=${this.limitOfArticles}$offset=${this.offset}`
          const realWorldArticles = await articles.getRealWorldArticles(apiUrlWithParams)
          this.articles = realWorldArticles.data.articles
          this.articlesCount = realWorldArticles.data.articlesCount
        }
        this.isLoadingArticles = false
      } catch (error) {
        // TODO: Handle possible errors
      }
    }
  }
}
</script>
