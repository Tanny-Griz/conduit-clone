<template>
  <div class="tag-list has-background-light mb-6">
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
  name: 'TagList',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
      required: false
    },
    tags: {
      type: Array,
      default: () => [],
      required: true
    }
  }
}
</script>
