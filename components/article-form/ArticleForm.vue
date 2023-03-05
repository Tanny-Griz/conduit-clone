<template>
  <div>
    <ValidationErrors v-if="validationErrors" class="mb-2" :validation-errors="validationErrors" />
    <form @submit.prevent="onSubmit">
      <b-field :label="$t('articleForm.title')">
        <b-input v-model="title" :placeholder="$t('articleForm.titleOfArticle')" />
      </b-field>
      <b-field :label="$t('articleForm.description')">
        <b-input v-model="description" :placeholder="$t('articleForm.about')" />
      </b-field>
      <b-field :label="$t('articleForm.body')">
        <b-input v-model="body" maxlength="1000" type="textarea" :placeholder="$t('articleForm.yourArticle')" />
      </b-field>
      <b-field>
        <b-input v-model="tagList" :placeholder="$t('articleForm.tags')" />
      </b-field>
      <b-field>
        <b-button
          native-type="submit"
          :disable="isSubmitting"
          type="is-success"
        >
          {{ $t('articleForm.publish') }}
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
      default: () => {},
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' ')
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
