<template>
  <div class="article-page">
    <template v-if="isLoadingArticle">
      <b-skeleton height="100" />
    </template>
    <template v-else>
      <div class="has-background-dark has-text-light section">
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
              <p><time>{{ dateTime(article.updatedAt) }}</time></p>
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
        <p>{{ article.body }}</p>
        <TagList
          v-if="article.tagList.length"
          :tags="article.tagList"
        />
        <hr>
        <div v-if="comments" class="mb-5">
          <article v-for="comment in comments" :key="comment.id" class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="comment.author.image">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ comment.author.username }}</strong> <small>{{ comment.author.email }}</small> <small>{{ dateTime(comment.createdAt) }}</small>
                  <br>
                  {{ comment.body }}
                </p>
              </div>
            </div>
            <div class="media-right">
              <button class="delete" @click="onDeleteComment(comment.id)" />
            </div>
          </article>
        </div>
        <div v-if="currentUser">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img :src="currentUser.image">
              </p>
            </figure>
            <div class="media-content">
              <div class="field">
                <p class="control">
                  <textarea v-model="commentBody" class="textarea" placeholder="Add a comment..." />
                </p>
              </div>
              <p v-if="errorMsg">
                {{ errorMsg }}
              </p>
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <b-button class="is-info" @click="onCreateComment">
                      Submit
                    </b-button>
                  </div>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {
  isIsoDate
} from '@/helpers'
import article from '@/api/article'
import comments from '@/api/comments'
import TagList from '@/components/tag-list/TagList.vue'

export default {
  name: 'ArticlePage',
  components: {
    TagList
  },
  data () {
    return {
      isLoadingArticle: false,
      isLoadingComments: false,
      article: {},
      comments: [],
      commentBody: '',
      errorMsg: ''
    }
  },
  async fetch () {
    await this.getArticle()
    await this.getComments()
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
    currentUser () {
      return this.$store.state.auth.currentUser
    },
    isAuthor () {
      if (!this.currentUser || !this.article) {
        return false
      }
      return this.currentUser.username === this.article.author.username
    }
  },
  mounted () {
    this.getComments()
  },
  methods: {
    isIsoDate,
    dateTime (date) {
      if (isIsoDate(date)) {
        return dayjs(date).format('MMM DD, YYYY')
      }
      return null
    },
    async getArticle () {
      try {
        this.isLoadingArticle = true
        const RES = await article.getArticle(this.$route.params.id)
        this.article = RES
        this.isLoadingArticle = false
      } catch (error) {
        this.isLoadingArticle = false
        console.log('getArticle', error)
      }
    },
    async onDeleteArticle (slug) {
      try {
        await article.deleteArticle(slug).then(() => this.$router.push('/'))
      } catch (error) {
        console.log('onDeleteArticle', error)
      }
    },
    async getComments () {
      try {
        const RES = await comments.getComments(this.slug)
        this.comments = RES
        console.log('RES', RES)
      } catch (error) {
        console.log('getComments', error)
      }
    },
    async onCreateComment () {
      if (this.commentBody.trim() !== '') {
        const body = {
          body: this.commentBody
        }
        try {
          await comments.createComment(this.slug, body)
          await this.getComments()
        } catch (error) {
          console.log('onCreateComment', error)
        }
        this.commentBody = ''
      } else {
        this.errorMsg = 'write something'
      }
    },
    async onDeleteComment (id) {
      try {
        await comments.deleteComment(this.slug, id)
        await this.getComments()
      } catch (error) {
        console.log('onDeleteComment', error)
      }
    }
  }
}
</script>
