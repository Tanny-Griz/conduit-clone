<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-3">
            {{ author.username }}
          </p>
          <p class="subtitle is-6">
            <time datetime="2016-1-1">{{ updatedAt }}</time>
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
        <p>Read more...</p>
        <b-taglist class="pt-2 px-2">
          <b-tag
            v-for='(tag, index) in tagList'
            :key="tag + index"
            class="has-background-white-ter has-text-grey is-clickable"
          >
            {{ tag }}
          </b-tag>
        </b-taglist>
      </div>
    </div>
  </div>
</template>

<script>
import {
  generateKey
} from '@/helpers'

export default {
  name: 'ArticleCard',
  props: {
    title: {
      required: false
    },
    description: {
      required: false
    },
    updatedAt: {
      default: null
    },
    author: {
      default: null
    },
    tagList: {
      required: false
    }
  },
  methods: {
    generateKey
  }
}
</script>
