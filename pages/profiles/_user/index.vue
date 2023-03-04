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
      isLoading: false,
      user: {}
    }
  },
  async fetch () {
    await this.getUser()
  },
  head () {
    return {
      titleTemplate: 'Profile Page'
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
  mounted () {
    this.getUser() // without this we have an error 500 from server
  },
  methods: {
    async getUser () {
      try {
        this.isLoading = true
        const { user } = this.$route.params
        const RES = await userProfile.getUser(user)
        this.$store.dispatch('userProfile/setUserProfile', RES)
        this.user = RES
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log('getUser error', error)
        // TODO: Handle errors
      }
    }
  }
}
</script>
