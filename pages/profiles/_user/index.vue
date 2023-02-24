<template>
  <div>
    <template v-if="isLoading">
      <b-skeleton height="100" />
    </template>
    <template v-else>
      <ProfileCard
        :user-profile="user"
        :current-user-name="currentUserName"
      />
    </template>
  </div>
</template>

<script>
import userProfile from '@/api/userProfile'
import ProfileCard from '@/components/profile-card/ProfileCard.vue'

export default {
  name: 'ProfilePage',
  components: { ProfileCard },
  data () {
    return {
      user: {},
      isLoading: true
    }
  },
  async fetch () {
    await this.getUser()
  },
  head () {
    return {
      titleTemplate: 'Profile'
    }
  },
  computed: {
    currentUserName () {
      return this.$store.getters['auth/currentUser']?.username
    },
    userProfileSlug () {
      return this.$route.params.user
    }
  },
  async mounted () {
    await this.getUser()
  },
  methods: {
    async getUser () {
      try {
        this.isLoading = true
        const { user } = this.$route.params
        const RES = await await userProfile.getUserProfile(user)
        this.user = RES
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        // TODO: Handle errors
      }
    }
  }
}
</script>
