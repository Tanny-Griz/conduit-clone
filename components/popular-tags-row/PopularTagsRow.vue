<template>
  <div class="popular-tags-row has-background-light mb-6">
    <h2 class="has-text-info has-text-weight-bold mb-3 pt-2 px-2">
      Popular Tags
    </h2>
    <b-taglist class="pt-2 px-2">
      <b-tag v-for="item in list" :key="item" class="has-background-grey-lighter is-clickable">
        {{ item }}
      </b-tag>
    </b-taglist>
  </div>
</template>

<script>

export default {
  name: 'PopularTagsRow',
  computed: {
    list () {
      return ['implementations', 'welcome', 'introduction', 'codebaseShow', 'ipsum', 'qui', 'et', 'quia', 'cupiditate', 'deserunt']
    }
  }
}
</script>
