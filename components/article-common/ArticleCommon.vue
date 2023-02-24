<template>
  <div>
    <div class="articles-wrapper">
      <template v-if="isLoadingArticles">
        <b-skeleton height="100" />
      </template>
      <template v-else>
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
          :is-favorited="article.favorited"
          :favorites-count="article.favoritesCount"
        />
      </template>
      <p v-if="!articles.length">
        No articles are here... yet.
      </p>
    </div>
    <Pagination
      :total="articlesCount"
      :limit="limit"
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
import queryString from 'query-string'
import articles from '@/api/articles'
import ArticleCard from '@/components/article-card/ArticleCard.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { limit } from '@/helpers'

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
      default: '',
      required: false
    }
  },
  data () {
    return {
      articles: [],
      isLoadingArticles: false,
      articlesCount: 0,
      limit,
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
      return this.currentPage * this.limit - this.limit // p 1 * 10 - 10 = 0, p 2 * 10 - 10 = 10
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
      const stringifiedParams = queryString.stringify({
        limit,
        offset: this.offset
      })
      try {
        if (this.tagName) {
          const apiUrlWithParams = `${this.apiUrl}?tag=${this.tagName}&${stringifiedParams}`
          const realWorldArticles = await articles.getRealWorldArticles(apiUrlWithParams)
          this.articles = realWorldArticles.data.articles
          this.articlesCount = realWorldArticles.data.articlesCount
        } else if (this.apiUrl.includes('=')) {
          const apiUrlWithParams = `${this.apiUrl}&${stringifiedParams}`
          const realWorldArticles = await articles.getRealWorldArticles(apiUrlWithParams)
          this.articles = realWorldArticles.data.articles
          this.articlesCount = realWorldArticles.data.articlesCount
        } else {
          const apiUrlWithParams = `${this.apiUrl}?${stringifiedParams}`
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
