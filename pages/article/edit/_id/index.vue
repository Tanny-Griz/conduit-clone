<template>
  <div class="edit-article-page section">
    <h1>Edit</h1>
    <ArticleForm
      v-if="initialValues"
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
  name: 'EditArticle',
  components: {
    ArticleForm
  },
  head () {
    return {
      titleTemplate: 'Edit Article'
    }
  },
  async asyncData ({ params }) {
    try {
      const data = await article.getArticle(params.id)
      return { article: data }
    } catch (error) {
      // TODO: Handle possible errors
    }
  },
  data () {
    return {
      validationErrors: {}
    }
  },
  computed: {
    isSubmitting () {
      return this.$store.state.auth.isSubmitting
    },
    slug () {
      return this.$route.params.id
    },
    initialValues () {
      if (!this.article) {
        return null
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      }
    }
  },
  methods: {
    async onArticleSubmit (articleInput) {
      try {
        await article.updateArticle(this.slug, articleInput).then(article => this.$router.push(`/article/${article.slug}`))
      } catch (error) {
        this.validationErrors = error.response.data.errors
      }
    }
  }
}
</script>
