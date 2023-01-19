<template>
  <section class="articles-of-followed-page section">
    <PopularTagsRow
      v-if="isLoggedIn"
      :is-loading="isLoadingTags"
      :tags="tags"
    />
    <h1 v-if="!isLoggedIn" class="has-text-weight-bold">
      To view articles by featured authors, you must <nuxt-link to="sign-up">
        register
      </nuxt-link> or <nuxt-link to="/log-in">
        log in
      </nuxt-link> your account and follow the user
    </h1>
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
      />
    </div>
    <Pagination
      v-if="isLoggedIn"
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
  </section>
</template>

<script>
import articles from '@/api/articles'
import tags from '@/api/tags'
import ArticleCard from '@/components/article-card/ArticleCard.vue'
import PopularTagsRow from '@/components/popular-tags-row/PopularTagsRow.vue'
import Pagination from '@/components/pagination/Pagination.vue'
import { limitOfArticles } from '@/helpers'

export default {
  name: 'Your Articles Page',
  components: {
    PopularTagsRow,
    ArticleCard,
    Pagination
  },
  data: () => {
    return {
      apiUrl: 'articles/feed',
      apiForTags: '/tags',
      articles: [],
      isLoadingArticles: false,
      isLoadingTags: false,
      tags: [],
      // for pagination
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
    await this.getRealWorldTags()
  },
  head () {
    return {
      titleTemplate: 'Your Articles Page'
    }
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
    },
    isLoggedIn () {
      return this.$store.getters['auth/isLoggedIn']
    },
    isAnonymous () {
      return this.$store.getters['auth/isAnonymous']
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
        const apiUrlWithParams = `${this.apiUrl}?${this.limitOfArticles}$${this.offset}`
        const realWorldArticles = await articles.getRealWorldArticles(apiUrlWithParams)
        this.articles = realWorldArticles.data.articles
        this.articlesCount = realWorldArticles.data.articlesCount
        this.isLoadingArticles = false
      } catch (error) {
        console.log('errrr')
        // TODO: Handle possible errors
      }
    },
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
