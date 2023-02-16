<template>
  <div class="article-page">
    <div v-if="article" class="has-background-dark has-text-light section">
      <h2 class="has-text-weight-semibold mb-3">
        {{ article.title }}
      </h2>
      <div class="is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap">
        <div class="is-flex is-align-items-center">
          <figure class="image is-48x48 mr-3">
            <img class="is-rounded" :src="article.author.image || 'https://bulma.io/images/placeholders/96x96.png'" alt="Placeholder image">
          </figure>
          <div>
            <p>{{ article.author.username }}</p>
            <p><time>{{ dateTime }}</time></p>
          </div>
        </div>
        <div v-if="isAuthor" class="is-flex is-flex-wrap-wrap">
          <nuxt-link
            tag="button"
            type="is-light"
            :to="`/article/edit/${ slug }`"
            class="button m-1"
          >
            <b-icon class="mr-1" is-clicable icon="pencil-outline" size="is-small" />Edit
          </nuxt-link>
          <!-- <b-button type="is-light" class="m-1">
            <b-icon class="mr-1" is-clicable icon="pencil-outline" size="is-small" />Edit
          </b-button> -->
          <b-button type="is-primary" class="m-1" @click="onDeleteArticle(article.slug)">
            <b-icon class="mr-1" is-clicable icon="delete" size="is-small" />Delete
          </b-button>
        </div>
        <div v-else class="is-flex is-flex-wrap-wrap">
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
      <TagList
        v-if="article.tagList.length"
        :tags="article.tagList"
      />
      <hr>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import article from '@/api/article'
import TagList from '@/components/tag-list/TagList.vue'

import {
  isIsoDate
} from '@/helpers'

export default {
  name: 'ArticlePage',
  components: {
    TagList
  },
  async asyncData ({ params }) {
    try {
      const data = await article.getArticle(params.id)
      return { article: data }
    } catch (error) {
      // TODO: Handle possible errors
    }
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
    },
    currentUser () {
      return this.$store.getters['auth/currentUser']
    },
    isAuthor () {
      if (!this.currentUser || !this.article) {
        return false
      }
      return this.currentUser.username === this.article.author.username
    }
  },
  methods: {
    isIsoDate,
    async onDeleteArticle (slug) {
      try {
        await article.deleteArticle(slug).then(() => this.$router.push('/'))
      } catch (error) {
        // TODO: Handle possible errors
      }
    }
  }
}
</script>
