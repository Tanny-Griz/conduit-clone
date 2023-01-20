<template>
  <div class="popular-tags-row has-background-light mb-6">
    <h2 class="has-text-info has-text-weight-bold mb-3 pt-2 px-2">
      Popular Tags
    </h2>
    <template v-if="isLoading">
      <div class="p-2">
        <b-skeleton />
      </div>
    </template>
    <template v-else>
      <b-taglist class="pt-2 px-2">
        <b-tag v-for="tag in tags" :key="tag" class="has-background-grey-lighter is-clickable">
          <nuxt-link :to="`/tags/${tag}`">
            {{ tag }}
          </nuxt-link>
        </b-tag>
      </b-taglist>
    </template>
  </div>
</template>

<script>

export default {
  name: 'PopularTagsRow',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Array,
      default: () => [],
      required: false
    }
  }
}
</script>
