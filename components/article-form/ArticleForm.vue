<template>
  <div>
    <ValidationErrors v-if="validationErrors" class="mb-2" :validation-errors="validationErrors" />
    <form @submit.prevent="onSubmit">
      <b-field label="Title">
        <b-input v-model="title" placeholder="Title of article" />
      </b-field>
      <b-field label="Description">
        <b-input v-model="description" placeholder="What's this article about?" />
      </b-field>
      <b-field label="Body">
        <b-input v-model="body" maxlength="200" type="textarea" placeholder="Write your article" />
      </b-field>
      <b-field>
        <b-input v-model="tagList" placeholder="Enter tags separated by space" />
      </b-field>
      <b-field>
        <b-button
          native-type="submit"
          :disable="isSubmitting"
          type="is-success"
        >
          Publish Article
        </b-button>
      </b-field>
    </form>
  </div>
</template>

<script>
import ValidationErrors from '@/components/validation-errors/ValidationErrors.vue'

export default {
  name: 'ArticleForm',
  components: {
    ValidationErrors
  },
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    validationErrors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      title: '',
      description: '',
      body: '',
      tagList: null
    }
  },
  methods: {
    onSubmit () {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList ? this.tagList.split(', ') : []
      }
      this.$emit('articleSubmit', form)
    }
  }
}
</script>
