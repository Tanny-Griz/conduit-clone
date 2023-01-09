<template>
  <div class="card">
    <div class="card-content">
      <template v-if="isLoading">
        <b-skeleton height="24" />
        <b-skeleton></b-skeleton>
      </template>
      <template v-else>
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img class="is-rounded" :src="author.image || 'https://bulma.io/images/placeholders/96x96.png'" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-3">
              {{ author.username }}
            </p>
            <p class="subtitle has-text-grey-light is-7">
              <time>{{ dateTime }}</time>
            </p>
          </div>
        </div>
        <div class="content">
          <h3 class="has-text-truncated">
            {{ title }}
          </h3>
          <p>{{ description }}</p>
        </div>
        <div class="is-flex is-justify-content-space-between is-align-items-center">
          <p class="is-clickable">
            Read more...
          </p>
          <b-taglist class="pt-2 px-2">
            <b-tag
              v-for="(tag, index) in tagList"
              :key="tag + index"
              class="has-background-white-ter has-text-grey is-clickable"
            >
              {{ tag }}
            </b-tag>
          </b-taglist>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {
  generateKey,
  isIsoDate
} from '@/helpers'

export default {
  name: 'ArticleCard',
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
    generateKey,
    isIsoDate
  }
}
</script>
