<template>
  <div class="new-article-page section">
    <ArticleForm
      :initial-values="initialValues"
      :is-submitting="isSubmitting"
      :validation-errors="validationErrors"
      @articleSubmit="onArticleSubmit"
    />
  </div>
</template>

<script>
import ArticleForm from '@/components/article-form/ArticleForm.vue'
import article from '@/api/article'

export default {
  name: 'NewArticlePage',
  components: {
    ArticleForm
  },
  data () {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      validationErrors: {}
    }
  },
  head () {
    return {
      titleTemplate: 'New Article Page'
    }
  },
  computed: {
    isSubmitting () {
      return this.$store.state.auth.isSubmitting
    }
  },
  methods: {
    async onArticleSubmit (articleInput) {
      try {
        await article.createArticle(articleInput).then(article => this.$router.push(`/article/${article.slug}`))
      } catch (error) {
        this.validationErrors = error.response.data.errors
      }
    }
  }
}
</script>
