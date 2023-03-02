<template>
  <div class="card">
    <div class="card-content">
      <template v-if="isLoading">
        <b-skeleton height="24" />
        <b-skeleton />
      </template>
      <template v-else>
        <div class="media is-flex-wrap-wrap">
          <div class="media-left">
            <figure class="image is-48x48">
              <img class="is-rounded" :src="author.image || 'https://bulma.io/images/placeholders/96x96.png'" alt="Placeholder image">
            </figure>
          </div>
          <div class="is-flex is-flex-direction-column">
            <nuxt-link :to="`/profiles/` + author.username" class="title is-inline-flex is-3">
              {{ author.username }}
            </nuxt-link>
            <p class="subtitle has-text-grey-light is-7">
              <time>{{ dateTime }}</time>
            </p>
          </div>
          <div class="favourite ml-auto">
            <FavoritesButton
              :is-favorited="isFavoritedOpt"
              :article-slug="slug"
              :favorites-count="favoritesCountOpt"
              @addToFavorite="onAddToFavorite"
            />
          </div>
        </div>
        <div class="content">
          <h3 class="has-text-truncated">
            {{ title }}
          </h3>
          <p>{{ description }}</p>
        </div>
        <div class="is-flex is-justify-content-space-between is-align-items-center">
          <nuxt-link :to="`/article/` + slug">
            Read more...
          </nuxt-link>
          <b-taglist class="pt-2 px-2">
            <b-tag
              v-for="(tag, index) in tagList"
              :key="tag + index"
              class="has-background-white-ter has-text-grey is-clickable"
            >
              <nuxt-link :to="`/tags/` + tag">
                {{ tag }}
              </nuxt-link>
            </b-tag>
          </b-taglist>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import FavoritesButton from '../favorites-button/FavoritesButton.vue'
import {
  isIsoDate
} from '@/helpers'

export default {
  name: 'ArticleCard',
  components: {
    FavoritesButton
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '',
      required: false
    },
    description: {
      type: String,
      default: '',
      required: false
    },
    updatedAt: {
      type: String,
      default: null
    },
    author: {
      type: Object,
      default: null
    },
    tagList: {
      type: Array,
      default: () => [],
      required: false
    },
    slug: {
      type: String,
      default: '',
      required: false
    },
    isFavorited: {
      type: Boolean,
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isFavoritedOpt: this.isFavorited,
      favoritesCountOpt: this.favoritesCount
    }
  },
  computed: {
    dateTime () {
      if (isIsoDate(this.updatedAt)) {
        return dayjs(this.updatedAt).format('DD/MM/YYYY, HH:mm')
      }
      return null
    }
  },
  methods: {
    isIsoDate,
    onAddToFavorite (slug) {
      this.$store.dispatch('favorites/addToFavorites', {
        slug,
        isFavotited: this.isFavoritedOpt
      })
      if (this.isFavoritedOpt) {
        this.favoritesCountOpt = this.favoritesCountOpt - 1
      } else {
        this.favoritesCountOpt = this.favoritesCountOpt + 1
      }
      this.isFavoritedOpt = !this.isFavoritedOpt
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/base/colors.scss';

.card {
  .media-content a {
    transition: all 0.3s;
    &:hover {
      color: $link;
    }
  }
}
</style>
