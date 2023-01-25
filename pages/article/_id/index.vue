<template>
  <div class="article-page">
    <div v-if="article" class="has-background-dark has-text-light section">
      <h2 class="has-text-weight-semibold mb-3">
        {{ article.title }}
      </h2>
      <div class="is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap">
        <div class="is-flex is-align-items-center">
          <figure class="image is-44x44 mr-3">
            <img class="is-rounded" :src="article.author.image || 'https://bulma.io/images/placeholders/96x96.png'" alt="Placeholder image">
          </figure>
          <div>
            <p>{{ article.author.username }}</p>
            <p><time>{{ dateTime }}</time></p>
          </div>
        </div>
        <div class="is-flex is-flex-wrap-wrap">
          <b-button type="is-light" class="m-1">
            <b-icon class="mr-1" is-clicable icon="plus" size="is-small" />Follow {{ article.author.username }}
          </b-button>
          <b-button type="is-primary" class="m-1">
            <b-icon class="mr-1" is-clicable icon="heart-outline" size="is-small" />Favorite Article
          </b-button>
        </div>
      </div>
    </div>
    <div v-if="article" class="section">
      <p>{{ article.description }}</p>
      <b-taglist class="pt-2 px-2">
        <b-tag
          v-for="(tag, index) in article.tagList"
          :key="tag + index"
          class="has-background-white-ter has-text-grey is-clickable"
        >
          <nuxt-link :to="`/tags/` + tag">
            {{ tag }}
          </nuxt-link>
        </b-tag>
      </b-taglist>
      <hr>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import article from '@/api/article'
import {
  isIsoDate
} from '@/helpers'

export default {
  name: 'ArticlePage',
  async asyncData ({ params }) {
    const data = await article.getArticle(params.id)
    return { article: data }
  },
  head () {
    return {
      titleTemplate: 'Article Page'
    }
  },
  computed: {
    slug () {
      return this.$route.params.id
    },
    dateTime () {
      if (isIsoDate(this.article.updatedAt)) {
        return dayjs(this.updatedAt).format('MMM DD, YYYY')
      }
      return null
    }
  },
  methods: {
    isIsoDate,
    async getArticle () {
      try {
        const realWorldArticle = await article.getArticle(this.$route.params.id)
        this.article = realWorldArticle
        console.log('realWorldArticle', realWorldArticle)
      } catch (error) {
        // TODO: Handle possible errors
      }
    }
  }
}
</script>
